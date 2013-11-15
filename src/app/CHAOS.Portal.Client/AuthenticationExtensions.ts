/// <reference path="Data.ts" />
/// <reference path="PortalClient.ts"/>

module CHAOS.Portal.Client
{
	export class EmailPassword
	{
		public static AuthenticationType(): string { return "EmailPassword"; }

		public static Login(email: string, password: string, serviceCaller: IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("EmailPassword/Login", HttpMethod.Get, { email: email, password: password }).WithCallback(response =>
			{
				if (response.Error == null)
					serviceCaller.SetSessionAuthenticated(EmailPassword.AuthenticationType(), response.Body.Results[0].Guid, response.Body.Results[0].SessionDateModified);
			});
		}

		public static SetPassword(userGuid: string, newPassword: string, serviceCaller: IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("EmailPassword/SetPassword", HttpMethod.Get, { userGuid: userGuid, newPassword: newPassword });
		}
	}

	export class SecureCookie
	{
		public static AuthenticationType(): string { return "SecureCookie"; }

		public static Create(serviceCaller: IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("SecureCookie/Create");
		}

		public static Login(guid: string, passwordGuid: string, serviceCaller: IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("SecureCookie/Login", HttpMethod.Get, { guid: guid, passwordGuid: passwordGuid }).WithCallback(response =>
			{
				if (response.Error == null)
				{
					serviceCaller.SetSessionAuthenticated(SecureCookie.AuthenticationType(), null, null);
					Session.Get(serviceCaller); //Make sure cached session is updated
				}
			});
		}
	}

	export class AuthKey
	{
		public static AuthenticationType(): string { return "AuthKey"; }

		public static Create(name: string, serviceCaller: IServiceCaller = null): ICallState<IAuthKey>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("AuthKey/Create", HttpMethod.Get, {name:name});
		}

		public static Login(token: string, serviceCaller: IServiceCaller = null): ICallState<ISession>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<ISession>("AuthKey/Login", HttpMethod.Get, { token: token }).WithCallback(response =>
			{
				if (response.Error == null)
				{
					serviceCaller.SetSessionAuthenticated(AuthKey.AuthenticationType(), response.Body.Results[0].UserGuid, null);
					Session.Get(serviceCaller); //Make sure cached session is updated
				}
			});
		}

		public static Get(serviceCaller: IServiceCaller = null): ICallState<IAuthKey>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("AuthKey/Get");
		}

		public static Delete(name: string, serviceCaller: IServiceCaller = null): ICallState<IAuthKey>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("AuthKey/Delete", HttpMethod.Get, { name: name });
		}
	}

	export interface IAuthKey
	{
		Name: string;
		Token: string;
		UserGuid: string;
	}
}