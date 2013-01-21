/// <reference path="PortalClient.ts"/>

module CHAOS.Portal.Client
{
	export class Session
    {
    	public static Create(callback:(response: IPortalResponse) => void = null, serviceCaller: IServiceCaller = null)
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			var outerCallback = (response: IPortalResponse) =>
			{
				if(response.Error == null)
					serviceCaller.UpdateSession(response.Result.Results[0]);

				if(callback != null)
					callback(response);
			}

			serviceCaller.CallService(outerCallback, "Session/Create", HttpMethod.Get(), null, false);
    	}
    }

	export class EmailPassword
    {
		public static AuthenticationType():string { return "EmailPassword"; }

    	public static Login(callback:(response: IPortalResponse) => void, email:string, password:string, serviceCaller: IServiceCaller = null)
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			var outerCallback = (response: IPortalResponse) =>
			{
				if(response.Error == null)
					serviceCaller.SetSessionAuthenticated(AuthenticationType());

				if(callback != null)
					callback(response);
			}

			serviceCaller.CallService(outerCallback, "EmailPassword/Login", HttpMethod.Get(), { email: email, password: password }, true);
    	}
    }

	export class SecureCookie
    {
		public static AuthenticationType():string { return "SecureCookie"; }

		public static Create(callback: (response: IPortalResponse) => void = null, serviceCaller: IServiceCaller = null)
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			serviceCaller.CallService(callback, "SecureCookie/Create", HttpMethod.Get(), null, true);
		}

    	public static Login(callback:(response: IPortalResponse) => void, guid:string, passwordGUID:string, serviceCaller: IServiceCaller = null)
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			var outerCallback = (response: IPortalResponse) =>
			{
				if(response.Error == null)
					serviceCaller.SetSessionAuthenticated(AuthenticationType());

				if(callback != null)
					callback(response);
			}

			serviceCaller.CallService(outerCallback, "SecureCookie/Login", HttpMethod.Get(), { guid: guid, passwordGUID: passwordGUID }, true);
    	}
    }

	export function Initialize(servicePath:string, clientGUID:string = null, autoCreateSession:bool = true):IPortalClient
    {
		var client = new PortalClient(servicePath, clientGUID);

		if(autoCreateSession)
			Session.Create(null, client);

    	ServiceCallerService.SetDefaultCaller(client);

    	return client;
    }

	export class ServiceCallerService
    {
		private static _defaultCaller:IServiceCaller = null;

		public static GetDefaultCaller():IServiceCaller
		{
			if(_defaultCaller == null)
				throw new Error("Default service caller not set");
			
			return _defaultCaller;
		}

		public static SetDefaultCaller(value:IServiceCaller):void
		{
			_defaultCaller = value;
		}
    }
}