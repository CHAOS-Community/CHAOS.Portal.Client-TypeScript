module CHAOS.Portal.Client
{
	export class Session
    {
		public static Create(serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<ISession>>
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<IPagedPortalResult<ISession>>("Session/Create", HttpMethod.Get, null, false).WithCallback(response =>
			{
				if(response.Error == null)
					serviceCaller.UpdateSession(response.Body.Results[0]);
			});
		}

		public static Get(serviceCaller: IServiceCaller = null):ICallState<IPagedPortalResult<ISession>>
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<IPagedPortalResult<ISession>>("Session/Get").WithCallback(response =>
			{
				if (response.Error == null)
					serviceCaller.UpdateSession(response.Body.Results[0]);
			});
		}

		public static Update(serviceCaller: IServiceCaller = null):ICallState<IPagedPortalResult<ISession>>
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<IPagedPortalResult<ISession>>("Session/Update").WithCallback(response =>
			{
				if (response.Error == null)
					serviceCaller.UpdateSession(response.Body.Results[0]);
			});
		}

		public static Delete(serviceCaller: IServiceCaller = null):ICallState<IPagedPortalResult<ISession>>
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<IPagedPortalResult<ISession>>("Session/Delete").WithCallback(response =>
			{
				if (response.Error == null)
				{
					serviceCaller.SetSessionAuthenticated(null, null, null);
					serviceCaller.UpdateSession(null);
				}
			});
    	}
    }

	export class User
	{
		public static Create(guid: string, email: string, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("User/Create", HttpMethod.Post, {guid: guid, email: email});
		}

		public static Update(guid: string, email: string, permissons: number = null, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("User/Update", HttpMethod.Post, {guid: guid, email: email, permissons: permissons}, true);
		}

		public static Delete(guid: string, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("User/Delete", HttpMethod.Get, {guid: guid});
		}

		public static Get(guid: string = null, groupGuid: string = null, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("User/Get", HttpMethod.Get, { guid: guid, groupGuid: groupGuid });
		}

		public static GetCurrent(serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<IUserInfo>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("User/GetCurrent");
		}
	}

	export class Group
	{
		public static Get(guid: string = null, userGuid: string = null, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("Group/Get", HttpMethod.Get, { guid: guid, userGuid: userGuid });
		}

		public static Create(name: string, systemPermission: number, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("Group/Create", HttpMethod.Get, {name:name, systemPermission : systemPermission });
		}

		public static Update(guid: string, newName: string, newSystemPermission: number = null, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("Group/Update", HttpMethod.Get, {guid: guid, newName:newName, newSystemPermission : newSystemPermission });
		}

		public static Delete(guid: string, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("Group/Delete", HttpMethod.Get, {guid:guid});
		}

		public static AddUser(guid: string, userGuid: string, permissions: number, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("Group/AddUser", HttpMethod.Get, { guid: guid, userGuid: userGuid, permissions: permissions });
		}

		public static RemoveUser(guid: string, userGuid: string, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("Group/RemoveUser", HttpMethod.Get, { guid: guid, userGuid: userGuid });
		}

		public static UpdateUserPermissions(guid: string, userGuid: string, permissions: number, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("Group/UpdateUserPermissions", HttpMethod.Get, { guid: guid, userGuid: userGuid, permissions: permissions });
		}
	}

	export class View
    {
		public static Get(view: string, query: string = null, sort: string = null, filter:string = null, pageIndex: number = 0, pageSize: number = 10, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("View/Get", HttpMethod.Get, { view: view, query: query, sort: sort, filter: filter, pageIndex: pageIndex, pageSize: pageSize});
    	}

		public static List(serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
    	{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("View/List");
    	}
    }

	export class ClientSettings
	{
		public static Get(guid: string, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("ClientSettings/Get", HttpMethod.Get, {guid: guid});
		}

		public static Set(guid: string, name: string, settings: string, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if(serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("ClientSettings/Set", HttpMethod.Post, {guid: guid, name: name, settings: settings});
		}
	}

	export function Initialize(servicePath:string, clientGUID:string = null, autoCreateSession:boolean = true):IPortalClient
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
            if (ServiceCallerService._defaultCaller == null)
				throw new Error("Default service caller not set");
            
            return ServiceCallerService._defaultCaller;
		}

		public static SetDefaultCaller(value:IServiceCaller):void
		{
            ServiceCallerService._defaultCaller = value;
		}
	}

	export interface IUserInfo
	{
		Guid: string;
		Email: string;
		SystemPermissions: number;
		SessionDateCreated: number;
		SessionDateModified: number;
	}
}