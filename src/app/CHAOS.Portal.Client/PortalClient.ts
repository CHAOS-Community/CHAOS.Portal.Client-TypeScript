/// <reference path="Data.ts"/>

module CHAOS.Portal.Client 
{
    export class PortalClient implements IPortalClient, IServiceCaller
    {
		public static GetClientVersion():string { return "2.0.0"; }
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
		public ClientGUID:string;

		constructor(servicePath:string, clientGUID: string = null)
		{
			if(typeof servicePath === "undefined")
				throw "Parameter servicePath must be set";

			if(servicePath.substr(-1) != "/")
				servicePath += "/";

			this._servicePath = servicePath;
			this.ClientGUID = clientGUID;

			this._sessionAcquired = new Event(this);
			this._sessionAuthenticated = new Event(this);
		}

		public CallService(callback:(response: IPortalResponse) => void, path:string, httpMethod:string, parameters:{ [index:string]:any; } = null, requiresSession:bool = true):void
		{
			if (parameters == null)
				parameters = {};

			if(requiresSession)
			{
				if(!this.HasSession())
					throw "Session not acquired";

				parameters["sessionGUID"] = this.GetCurrentSession().GUID;
			}

			new ServiceCall().Call(callback, this.GetServicePath() + "latest/" + path, httpMethod, parameters);
			//new ServiceCall(callback, this.GetServicePath() + "/" + PortalClient.GetProtocolVersion() + "/" + path, httpMethod, parameters);
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

    class ServiceCall
    {
    	private _request: any;
    	private _callback: (response: IPortalResponse) => void;

    	public Call(callback:(response: IPortalResponse) => void, path:string, httpMethod:string, parameters:{ [index:string]:any; } = null)
    	{
			if (parameters == null)
				parameters = {};

			parameters["format"] = "json";
			parameters["userHTTPStatusCodes"] = "False";

			this._request = window["XMLHttpRequest"] ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			this._callback = callback;

			if (callback != null)
				this._request.onreadystatechange = ()=> this.RequestStateChange();

			var data = this.CreateQueryString(parameters);

			if (httpMethod == HttpMethod.Get())
			{
				path += "?" + data;
				data = null;
			}

			this._request.open(httpMethod, path, true);

			if (httpMethod == HttpMethod.Post())
				this._request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

			this._request.send(data);
    	}

    	private RequestStateChange(): void
    	{
			if (this._request.readyState != 4)
				return;
						
			if (this._request.status == 200)
			{
				var response = JSON && JSON.parse(this._request.responseText) || eval(this._request.responseText);

				if(response.Error != null && response.Error.Fullname == null)
					response.Error = null;

				this._callback(response);
			}
			else
				this._callback({Header: null, Result: null, Error: { Fullname: "ServiceError", Message: "Service call failed", Stacktrace: null, InnerException: null } });
    	}

		private CreateQueryString(parameters: { [index:string]:any; }): string
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