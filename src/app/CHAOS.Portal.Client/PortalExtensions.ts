/// <reference path="PortalClient.ts"/>

module CHAOS.Portal.Client
{
	export class Session
    {
    	public static Create(serviceCaller: IServiceCaller = null):ICallState
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Session/Create", HttpMethod.Get(), null, false).WithCallback((response: IPortalResponse) =>
			{
				if(response.Error == null)
					serviceCaller.UpdateSession(response.Result.Results[0]);
			});
    	}
    }

	export class EmailPassword
    {
		public static AuthenticationType():string { return "EmailPassword"; }

    	public static Login(email:string, password:string, serviceCaller: IServiceCaller = null):ICallState
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("EmailPassword/Login", HttpMethod.Get(), { email: email, password: password }, true).WithCallback((response: IPortalResponse) =>
			{
				if(response.Error == null)
					serviceCaller.SetSessionAuthenticated(AuthenticationType());
			});
    	}
    }

	export class SecureCookie
    {
		public static AuthenticationType():string { return "SecureCookie"; }

		public static Create(serviceCaller: IServiceCaller = null):ICallState
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("SecureCookie/Create", HttpMethod.Get(), null, true);
		}

    	public static Login(guid:string, passwordGuid:string, serviceCaller: IServiceCaller = null):ICallState
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("SecureCookie/Login", HttpMethod.Get(), { guid: guid, passwordGuid: passwordGuid }, true).WithCallback((response: IPortalResponse) =>
			{
				if(response.Error == null)
					serviceCaller.SetSessionAuthenticated(AuthenticationType());
			});
    	}
    }

	export class User
	{
		public static Get(serviceCaller: IServiceCaller = null):ICallState
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("User/Get", HttpMethod.Get(), null, true);
		}

		public static GetCurrent(serviceCaller: IServiceCaller = null):ICallState
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("View/GetCurrent", HttpMethod.Get(), null, true);
		}
	}

	export class Group
	{
		public static Get(serviceCaller: IServiceCaller = null):ICallState
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Group/Get", HttpMethod.Get(), null, true);
		}

		public static Create(name:string, systemPermission:number, serviceCaller: IServiceCaller = null):ICallState
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Group/Create", HttpMethod.Get(), {name:name, systemPermission : systemPermission }, true);
		}

		public static Update(guid:string, newName:string, newSystemPermission :number = null, serviceCaller: IServiceCaller = null):ICallState
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Group/Update", HttpMethod.Get(), {guid: guid, newName:newName, newSystemPermission : newSystemPermission }, true);
		}

		public static Delete(guid:string, serviceCaller: IServiceCaller = null):ICallState
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Group/Delete", HttpMethod.Get(), {guid:guid}, true);
		}
	}

	export class View
    {
    	public static Get(view:string, query:string = null, sort:string = null, pageIndex:number = 0, pageSize:number = 10, serviceCaller: IServiceCaller = null):ICallState
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("View/Get", HttpMethod.Get(), {view: view, query: query, sort: sort, pageIndex: pageIndex, pageSize: pageSize}, true);
    	}

		public static List(serviceCaller: IServiceCaller = null):ICallState
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("View/List", HttpMethod.Get(), null, true);
    	}
    }

	export class ClientSettings
	{
		public static Get(guid:string, serviceCaller: IServiceCaller = null):ICallState
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("ClientSettings/Get", HttpMethod.Get(), {guid: guid}, true);
		}

		public static Set(guid:string, name:string, settings:string, serviceCaller: IServiceCaller = null):ICallState
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("ClientSettings/Set", HttpMethod.Post(), {guid: guid, name: name, settings: settings}, true);
		}
	}

	export function Initialize(servicePath:string, clientGUID:string = null, autoCreateSession:bool = true):IPortalClient
    {
		var client = new PortalClient(servicePath, clientGUID);

		if(autoCreateSession)
			Session.Create(client);

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