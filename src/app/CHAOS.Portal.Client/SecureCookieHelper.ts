/// <reference path="PortalClient.ts"/>
/// <reference path="PortalExtensions.ts"/>

module CHAOS.Portal.Client
{
	export class SecureCookieHelper
	{
		private static COOKIE_LIFE_TIME_DAYS:number = 90;

		public static DoesCookieExist(): boolean
		{
			return this.GetCookie() != null;
		}

		public static Login(callback:(success:boolean) => void = null, serviceCaller:CHAOS.Portal.Client.IServiceCaller = null):void
		{ 
			var login = this.GetCookie();

			if (login == null)
			{
				if(callback != null) callback(false);
				return;
			}

			SecureCookie.Login(login.Guid, login.PasswordGuid, serviceCaller).WithCallback(response => {
				if (response.Error == null)
				{
					this.SetCookie(response.Body.Results[0].Guid, response.Body.Results[0].PasswordGuid, this.COOKIE_LIFE_TIME_DAYS);
					if(callback != null) callback(true);
				}
				else
					if(callback != null) callback(false);
			});
		}

		public static Create(serviceCaller:CHAOS.Portal.Client.IServiceCaller = null):void
		{
			SecureCookie.Create(serviceCaller).WithCallback(response =>
			{
				if(response.Error == null)
					this.SetCookie(response.Body.Results[0].Guid, response.Body.Results[0].PasswordGuid, this.COOKIE_LIFE_TIME_DAYS);
			});
		}

		public static Clear(): void
		{
			this.SetCookie("", "", -2);
		}

		private static GetCookie(): { Guid: string; PasswordGuid: string; }
		{
			var cookie = document.cookie;

			if (cookie == undefined || cookie == null)
				return null;

			var guidRegEx = /SecureCookieGuid\=(.+?)(?:;|$)/;
			var passwordRegex = /SecureCookiePasswordGuid\=(.+?)(?:;|$)/;

			var result = { Guid: "", PasswordGuid: "" };
			var match = guidRegEx.exec(cookie);

			if (match == null)
				return null;

			result.Guid = match[1];

			match = passwordRegex.exec(cookie);

			if (match == null)
				return null;

			result.PasswordGuid = match[1];

			return result;
		}

		private static SetCookie(guid:string, passwordGuid:string, expireInDays:number):void
		{
			var expireDate = new Date();
			expireDate.setDate(expireDate.getDate() + expireInDays);

			document.cookie = "SecureCookieGuid=" + (guid == null ? "" : guid) + "; expires=" + expireDate.toUTCString() + ";";
			document.cookie = "SecureCookiePasswordGuid=" + (passwordGuid == null ? "" : passwordGuid) + "; expires=" + expireDate.toUTCString() + ";";
		}
	}
}