module CHAOS.Portal.Client
{
	export class EmailPassword
	{
		public static AuthenticationType(): string { return "EmailPassword"; }

		public static Login(email: string, password: string, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("EmailPassword/Login", HttpMethod.Post, { email: email, password: password }).WithCallback(response =>
			{
				if (response.Error == null)
					serviceCaller.SetSessionAuthenticated(EmailPassword.AuthenticationType(), response.Body.Results[0].Guid, response.Body.Results[0].SessionDateModified);
			});
		}

		public static SetPassword(userGuid: string, newPassword: string, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("EmailPassword/SetPassword", HttpMethod.Post, { userGuid: userGuid, newPassword: newPassword });
		}
	}

	export class SecureCookie
	{
		public static AuthenticationType(): string { return "SecureCookie"; }

		public static Create(serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("SecureCookie/Create");
		}

		public static Login(guid: string, passwordGuid: string, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<any>>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("SecureCookie/Login", HttpMethod.Post, { guid: guid, passwordGuid: passwordGuid }).WithCallback(response =>
			{
				if (response.Error == null)
				{
					serviceCaller.SetSessionAuthenticated(SecureCookie.AuthenticationType(), null, null);
					Session.Get(serviceCaller); //Make sure cached session is updated
				}
			});
		}
	}

	export class Facebook
	{
		public static AuthenticationType(): string { return "Facebook"; }

		public static Login(signedRequest: string, userAccessToken: string, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<ISession>>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<IPagedPortalResult<ISession>>("Facebook/Login", HttpMethod.Post, { signedRequest: signedRequest, userAccessToken: userAccessToken }).WithCallback(response =>
			{
				if (response.Error == null)
				{
					serviceCaller.SetSessionAuthenticated(Facebook.AuthenticationType(), response.Body.Results[0].UserGuid, null);
					Session.Get(serviceCaller); //Make sure cached session is updated
				}
			});
		}
	}

	export class AuthKey
	{
		public static AuthenticationType(): string { return "AuthKey"; }

		public static Create(name: string, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<IAuthKey>>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<any>("AuthKey/Create", HttpMethod.Get, {name:name});
		}

		public static Login(token: string, serviceCaller: IServiceCaller = null): ICallState<IPagedPortalResult<ISession>>
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<IPagedPortalResult<ISession>>("AuthKey/Login", HttpMethod.Post, { token: token }).WithCallback(response =>
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

	export class OAuth
	{
		public static AuthenticationType(): string { return "OAuth"; }

		public static GetLoginEndPoint(callbackUrl: string, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<IPagedPortalResult<ILoginEndPoint>>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("OAuth/GetLoginEndPoint", CHAOS.Portal.Client.HttpMethod.Get, { callbackUrl: callbackUrl }, true);
		}

		public static ProcessLogin(callbackUrl: string, responseUrl: string, stateCode: string, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<IPagedPortalResult<ISession>>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService<IPagedPortalResult<ISession>>("OAuth/ProcessLogin", CHAOS.Portal.Client.HttpMethod.Get, { callbackUrl: callbackUrl, responseUrl: responseUrl, stateCode: stateCode }, true).WithCallback(response =>
			{
				if (response.Error == null)
				{
					var session = <ISession>response.Body.Results[0];

					serviceCaller.SetSessionAuthenticated(OAuth.AuthenticationType(), session.UserGuid, session.DateModified);
				}
			});
		}
	}

	export interface ILoginEndPoint
	{
		Uri: string;
		StateCode: string;
	}

	export interface IAuthKey
	{
		Name: string;
		Token: string;
		UserGuid: string;
	}
}