module CHAOS.Portal.Client 
{
    export class PortalClient implements IPortalClient, IServiceCaller
    {
		public static GetClientVersion():string { return "2.10.4"; }
    	private static GetProtocolVersion():number { return 6; }

    	private _servicePath:string;
		private _currentSession:ISession;
		private _authenticationType: string = null;
		private _sessionAcquired:Event<ISession>;
		private _sessionAuthenticated:Event<string>;

		public GetServicePath():string { return this._servicePath; }
		public GetCurrentSession(): ISession { return this._currentSession; }
		public HasSession(): boolean { return this.GetCurrentSession() != null; }
		public IsAuthenticated(): boolean { return this._authenticationType != null; }
		public AuthenticationType(): string { return this._authenticationType; }
		public SessionAcquired():IEvent<ISession> { return this._sessionAcquired; }
		public SessionAuthenticated():IEvent<string> { return this._sessionAuthenticated; }
		public ClientGuid:string;

		constructor(servicePath:string, clientGuid:string = null)
		{
			if (servicePath == null || servicePath == "" || typeof servicePath != "string")
				throw new Error("Parameter servicePath must be set to a valid path");

			if(servicePath.substr(servicePath.length -1, 1) != "/")
				servicePath += "/";

			this._servicePath = servicePath;
			this.ClientGuid = clientGuid;

			this._sessionAcquired = new Event(this);
			this._sessionAuthenticated = new Event(this);
		}

		public CallService<T>(path:string, method:HttpMethod = HttpMethod.Get, parameters:{ [index:string]:any; } = null, requiresSession:boolean = true):ICallState<T>
		{
		    if (requiresSession)
		        parameters = this.AddSessionToParameters(parameters);

			return new CallState().Call(this.GetPathToExtension(path), method, parameters);
		}

		public GetServiceCallUri(path: string, parameters: { [index: string]: any; } = null, requiresSession: boolean = true, format:string = "json2"): string
		{
		    if (requiresSession)
		        parameters = this.AddSessionToParameters(parameters);

		    return this.GetPathToExtension(path) + "?" + ServiceCall.CreateDataStringWithPortalParameters(parameters, format);
		}

		private GetPathToExtension(path: string): string
		{
		    return this.GetServicePath() + "v" + PortalClient.GetProtocolVersion() + "/" + path;
		}

		private AddSessionToParameters(parameters: { [index: string]: any; }): { [index: string]: any; }
		{
		    if (parameters == null)
		        parameters = {};

		    if (!this.HasSession())
		        throw new Error("Session not acquired");

		    parameters["sessionGUID"] = this.GetCurrentSession().Guid;

		    return parameters;
		}

		public UpdateSession(session: ISession): void
		{
			var hadSession = this._currentSession != null;

			this._currentSession = session;

			if (!hadSession && session != null)
				this._sessionAcquired.Raise(session);
			else if (session == null)
				this._authenticationType = null;
		}

		public SetSessionAuthenticated(type: string, userGuid?: string, sessionDateModified?: number): void
		{
			this._authenticationType = type;

			if (type != null)
			{
				if (userGuid != null)
					this._currentSession.UserGuid = userGuid;
				if (sessionDateModified != null)
					this._currentSession.DateModified = sessionDateModified;

				this._sessionAuthenticated.Raise(type);
			}
		}
	}

	class CallState<T> implements ICallState<T>
    {
		private _completed:Event<IPortalResponse<T>>;
		private _progressChanged: Event<ITransferProgress>;
		private _call: ServiceCall<T> = null;

		constructor()
		{
			this._completed = new Event<IPortalResponse<T>>(this);
			this._progressChanged = new Event<ITransferProgress>(this);
		}

		public TransferProgressChanged(): IEvent<ITransferProgress>
		{
			return this._progressChanged;
		}

		public Call(path: string, method: HttpMethod, parameters: { [index: string]: any; } = null): ICallState<T>
		{
			if (this._call != null)
				throw new Error("Call can not be called multiple times");

			this._call = new ServiceCall();

			this._call.Call((response: IPortalResponse<T>) => this._completed.Raise(response), (progress: ITransferProgress) => this._progressChanged.Raise(progress), path, method, parameters);

    		return this;
    	}

		public WithCallback(callback:(response:IPortalResponse<T>)=> void, context:any = null):ICallState<T>
		{
			if(context == null)
				this._completed.Add(callback);
			else
				this._completed.Add((response: IPortalResponse<T>) => callback.call(context, response));
			
			return this;
    	}

		public WithCallbackAndToken(callback: (response: IPortalResponse<T>, token: any) => void , token: any, context: any = null): ICallState<T>
    	{
			if(context == null)
				this._completed.Add((response: IPortalResponse<T>) => callback(response, token));
			else
				this._completed.Add((response: IPortalResponse<T>) => callback.call(context, response, token));
			
			return this;
    	}
    }

	class ServiceCall<T>
    {
    	private _request: any;
		private _completeCallback: (response: IPortalResponse<T>) => void;
		private _progressCallback: (progress: ITransferProgress) => void;

		public Call(completeCallback: (response: IPortalResponse<T>) => void, progressCallback: (progress: ITransferProgress) => void, path: string, method: HttpMethod, parameters:{ [index:string]:any; } = null):void
    	{
			this._completeCallback = completeCallback;
			this._progressCallback = progressCallback;

		    if (window["FormData"])
				this.CallWithXMLHttpRequest2Browser(path, method, parameters);
			else if (window["XMLHttpRequest"])
				this.CallWithXMLHttpRequestBrowser(path, method, parameters);
			else if (window["XDomainRequest"] || window["ActiveXObject"])
				this.CallWithOldIEBrowser(path, method, parameters);
			else
				throw new Error("Browser does not supper AJAX requests");
		}

		private CallWithXMLHttpRequest2Browser(path: string, method: HttpMethod, parameters:{ [index:string]:any; } = null):void
		{
			this._request = new XMLHttpRequest();
			var data:FormData = null;

			if (method == HttpMethod.Get)
				path += "?" + ServiceCall.CreateDataStringWithPortalParameters(parameters);
			else
			{
				parameters = ServiceCall.AddPortalParameters(ServiceCall.ConvertDatesToCorrectFormat(ServiceCall.RemoveNullParameters(parameters)));
				data = new FormData();
				for (var key in parameters)
					data.append(key, parameters[key]);
			}

			this._request.onreadystatechange = () => this.RequestStateChange();
			this._request.upload.onprogress = (event: ProgressEvent) => this.ReportProgressUpdate(event.loaded, event.total, event.lengthComputable);

			this._request.open(method == HttpMethod.Get ? "GET" : "POST", path, true);
			this._request.send(data);
		}

		private CallWithXMLHttpRequestBrowser(path:string, method:HttpMethod, parameters:{ [index:string]:any; } = null):void
		{
			this._request = new XMLHttpRequest();
			var data = ServiceCall.CreateDataStringWithPortalParameters(parameters);

			if (method == HttpMethod.Get)
			{
				path += "?" + data;
				data = null;
			}

			this._request.onreadystatechange = () => this.RequestStateChange();

			this._request.open(method == HttpMethod.Get ? "GET" : "POST", path, true);

			if (method == HttpMethod.Post)
				this._request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			this._request.send(data);
		}

		private CallWithOldIEBrowser(path: string, method: HttpMethod, parameters: { [index: string]: any; } = null): void
		{
			this._request = window["XDomainRequest"] ? new XDomainRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			var data = ServiceCall.CreateDataStringWithPortalParameters(parameters);

			if (method == HttpMethod.Get)
			{
				path += "?" + data;
				data = null;
			}

			this._request.onload = () => this.ReportCompleted(this._request.responseText);
			this._request.onerror = this._request.ontimeout = () => this.ReportError();

			this._request.open(method == HttpMethod.Get ? "GET" : "POST", path);
			this._request.send(data);

			if (this._request.responseText != "")
				setTimeout(() => this.ReportCompleted(this._request.responseText), 1); // Delay cached response so callbacks can be attached
		}

    	private RequestStateChange(): void
    	{
			if (this._request.readyState != 4)
				return;
						
			if (this._request.status == 200)
				this.ReportCompleted(this._request.responseText);
			else
				this.ReportError();
    	}

		private ReportCompleted(responseText:string):void
		{
			if (this._completeCallback == null) return;

            var response = JSON && JSON.parse(responseText) || eval(responseText);

			if(response.Error != null && response.Error.Fullname == null)
				response.Error = null;

			this._completeCallback(response);
		}

		private ReportProgressUpdate(bytesTransfered: number, totalBytes: number, totalBytesIsKnown:boolean):void
		{
			if (this._progressCallback == null) return;

			this._progressCallback({ BytesTransfered: bytesTransfered, TotalBytes: totalBytes, TotalBytesIsKnown: totalBytesIsKnown });
		}

		private ReportError():void
		{
			if (this._completeCallback == null) return;

			this._completeCallback({Header: null, Body: null, Error: { Fullname: "ServiceError", Message: "Service call failed", Stacktrace: null, InnerException: null } });
		}

		public static CreateDataStringWithPortalParameters(parameters: { [index: string]: any; }, format:string = "json2"): string
		{
			return ServiceCall.CreateDataString(ServiceCall.AddPortalParameters(parameters, format));
		}

		public static CreateDataString(parameters: { [index: string]: any; }): string
		{
			parameters = ServiceCall.ConvertDatesToCorrectFormat(ServiceCall.RemoveNullParameters(parameters));

			var result: string = "";
			var first: boolean = true;
			for (var key in parameters)
			{
				result += (first ? "" : "&") + key + "=" + encodeURIComponent(parameters[key]);

				if (first)
					first = false;
			}

			return result;
		}

		private static ConvertDate(date: Date): string
		{
			return ServiceCall.ToTwoDigits(date.getUTCDate()) + "-" + ServiceCall.ToTwoDigits(date.getUTCMonth() + 1) + "-" + date.getUTCFullYear() + " " + ServiceCall.ToTwoDigits(date.getUTCHours()) + ":" + ServiceCall.ToTwoDigits(date.getUTCMinutes()) + ":" + ServiceCall.ToTwoDigits(date.getUTCSeconds());
			//return date.getUTCFullYear() + "-" + ServiceCall.ToTwoDigits(date.getUTCMonth() + 1) + "-" + ServiceCall.ToTwoDigits(date.getUTCDate()) + "T" + ServiceCall.ToTwoDigits(date.getUTCHours()) + ":" + ServiceCall.ToTwoDigits(date.getUTCMinutes()) + ":" + ServiceCall.ToTwoDigits(date.getUTCSeconds()) + "Z";
		}

		private static AddPortalParameters(parameters: { [index: string]: any; }, format: string = "json2"):{ [index:string]:any; }
		{
			if (parameters == null)
				parameters = {};

			parameters["format"] = format;
			parameters["userHTTPStatusCodes"] = "False";

			return parameters;
		}

		private static ConvertDatesToCorrectFormat(parameters:{ [index:string]:any; }):{ [index:string]:any; }
		{
			var value: any;

			for (var key in parameters)
			{
				value = parameters[key];
				if (Object.prototype.toString.call(value) === '[object Date]')
					parameters[key] = ServiceCall.ConvertDate(value);
			}

			return parameters;
		}

		private static RemoveNullParameters(parameters:{ [index:string]:any; }):{ [index:string]:any; }
		{
			var value: any;

			for (var key in parameters)
			{
				value = parameters[key];
				if (value == null)
					delete parameters[key];
			}

			return parameters;
		}

		private static ToTwoDigits(value: number): string
		{
			return value < 10 ? "0" + value : value.toString();
		}
    }

	class Event<T> implements IEvent<T>
    {
    	private _sender: any;
    	private _handlers:Array<(data:T)=>void> = [];

    	constructor(private sender: any)
    	{
			if(typeof sender === "undefined")
				throw new Error("Parameter sender must be set");

    		this._sender = sender;
    	}

		public Add(handler: (data: T) => void):void
		{
			if (handler == null)
				throw new Error("handler must be defined");

			this._handlers.push(handler);
		}

		public Remove(handler: (data: T) => void ): void
		{
			if (handler == null)
				throw new Error("handler must be defined");

			for (var i = 0; i < this._handlers.length; i++)
			{
				if (this._handlers[i] === handler)
				{
					this._handlers.splice(i, 1);
					return;
				}
			}
		}

		public Raise(data:T): void
		{
			for (var i = 0; i < this._handlers.length; i++)
				this._handlers[i].call(this._sender, data);
		}
    }
}