/// <reference path="Data.ts"/>

module CHAOS.Portal.Client 
{
    export class PortalClient implements IPortalClient, IServiceCaller
    {
		public static GetClientVersion():string { return "2.5.0"; }
    	private static GetProtocolVersion():number { return 6; }

    	private _servicePath:string;
		private _currentSession:ISession;
		private _authenticationType: string = null;
		private _sessionAcquired:Event;
		private _sessionAuthenticated:Event;

		public GetServicePath():string { return this._servicePath; }
		public GetCurrentSession(): ISession { return this._currentSession; }
		public HasSession(): bool { return this.GetCurrentSession() != null; }
		public IsAuthenticated(): bool { return this._authenticationType != null; }
		public SessionAcquired():IEvent { return this._sessionAcquired; }
		public SessionAuthenticated():IEvent { return this._sessionAuthenticated; }
		public ClientGuid:string;

		constructor(servicePath:string, clientGuid:string = null)
		{
			if(typeof servicePath === "undefined")
				throw "Parameter servicePath must be set";

			if(servicePath.substr(servicePath.length -1, 1) != "/")
				servicePath += "/";

			this._servicePath = servicePath;
			this.ClientGuid = clientGuid;

			this._sessionAcquired = new Event(this);
			this._sessionAuthenticated = new Event(this);
		}

		public CallService<T>(path:string, httpMethod:string, parameters:{ [index:string]:any; } = null, requiresSession:bool = true):ICallState<T>
		{
		    if (requiresSession)
		        parameters = this.AddSessionToParameters(parameters);

			return new CallState().Call(this.GetPathToExtension(path), httpMethod, parameters);
		}

		public GetServiceCallUri(path: string, parameters: { [index: string]: any; } = null, requiresSession: bool = true, format:string = "json"): string
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
		        throw "Session not acquired";

		    parameters["sessionGUID"] = this.GetCurrentSession().Guid;

		    return parameters;
		}

		public UpdateSession(session: ISession): void
		{
			this._currentSession = session;

			this._sessionAcquired.Raise(session);
		}

		public SetSessionAuthenticated(type: string): void
		{
			this._authenticationType = type;

			this._sessionAuthenticated.Raise(type);
		}
    }

	class CallState<T> implements ICallState<T>
    {
		private _completed:Event;
		private _call: ServiceCall<T>;

    	public Call<T>(path: string, httpMethod: string, parameters: { [index: string]: any; } = null): ICallState<T>
    	{
    		this._completed = new Event(this);
			this._call = new ServiceCall();

			this._call.Call((response: IPortalResponse<T>) => this._completed.Raise(response), path, httpMethod, parameters);

    		return this;
    	}

    	public WithCallback<T>(callback: (response: IPortalResponse<T>) => void, context:any = null): ICallState<T>
    	{
			if(context == null)
				this._completed.Add(callback);
			else
				this._completed.Add((response: IPortalResponse<T>) => callback.call(context, response));
			
			return this;
    	}

		public WithCallbackAndToken<T>(callback: (response: IPortalResponse<T>, token: any) => void , token: any, context: any = null): ICallState<T>
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
		private _callback: (response: IPortalResponse<T>) => void;

		public Call(callback: (response: IPortalResponse<T>) => void, path:string, httpMethod:string, parameters:{ [index:string]:any; } = null):void
    	{
    	    var data = ServiceCall.CreateDataStringWithPortalParameters(parameters);

			if (httpMethod == HttpMethod.Get())
			{
				path += "?" + data;
				data = null;
			}

			this._request = window["XMLHttpRequest"] ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			this._callback = callback;

			if ("withCredentials" in this._request)
			{
				if (callback != null)
					this._request.onreadystatechange = ()=> this.RequestStateChange();

				this._request.open(httpMethod, path, true);

				if (httpMethod == HttpMethod.Post())
					this._request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

				this._request.send(data);
			}
			else if (window["XDomainRequest"]) //For IE 8/9
			{
				this._request = new XDomainRequest();

				if (callback != null)
				{
					this._request.onload = () => this.ParseResponse(this._request.responseText);
					this._request.onerror = this._request.ontimeout = () => this.ReportError();
				}

				this._request.open(httpMethod, path);
				this._request.send(data);

				if (callback != null && this._request.responseText != "")
					setTimeout(() => this.ParseResponse(this._request.responseText), 1); // Delay cached response so callbacks can be attached
			}
			else
				throw "Browser does not supper AJAX requests";
    	}

    	private RequestStateChange(): void
    	{
			if (this._request.readyState != 4)
				return;
						
			if (this._request.status == 200)
				this.ParseResponse(this._request.responseText);
			else
				this.ReportError();
    	}

		private ParseResponse(responseText:string):void
		{
            var response = JSON && JSON.parse(responseText) || eval(responseText);

			if(response.Error != null && response.Error.Fullname == null)
				response.Error = null;

			this._callback(response);
		}

		private ReportError():void
		{
			this._callback({Header: null, Result: null, Error: { Fullname: "ServiceError", Message: "Service call failed", Stacktrace: null, InnerException: null } });
		}

		public static CreateDataStringWithPortalParameters(parameters: { [index: string]: any; }, format:string = "json"): string
		{
		    if (parameters == null)
		        parameters = {};

		    parameters["format"] = format;
		    parameters["userHTTPStatusCodes"] = "False";

            return ServiceCall.CreateDataString(parameters);
		}

		public static CreateDataString(parameters: { [index:string]:any; }): string
		{ 
			var result: string = "";
			var first:bool = true;
			for(var key in parameters)
			{
				if(parameters[key] == null || typeof parameters[key] === 'undefined')
					continue;

				result += (first ? "" : "&" ) + key + "=" + encodeURIComponent(parameters[key]);

				if (first)
					first = false;
			}

			return result;
		}
    }

	class Event implements IEvent
    {
    	private _sender: any;
    	private _handlers: { (any):void; }[] = [];

    	constructor(private sender: any)
    	{
			if(typeof sender === "undefined")
				throw "Parameter sender must be set";

    		this._sender = sender;
    	}

		public Add(handler:(any) => void):void
		{
			if (handler == undefined || handler == null)
				throw "handler must be defined";

			this._handlers.push(handler);
		}

		public Remove(handler: (any) => void ): void
		{
			if (handler == undefined || handler == null)
				throw "handler must be defined";

			for (var i = 0; i < this._handlers.length; i++)
			{
				if (this._handlers[i] === handler)
				{
					this._handlers.splice(i, 1);
					return;
				}
			}
		}

		public Raise(data: any): void
		{
			for (var i = 0; i < this._handlers.length; i++)
				this._handlers[i].call(this._sender, data);
		}
    }
}