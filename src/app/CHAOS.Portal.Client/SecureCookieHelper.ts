/// <reference path="PortalClient.ts"/>
/// <reference path="PortalExtensions.ts"/>

module CHAOS.Portal.Client
{
	export class SecureCookieHelper
	{
		private static COOKIE_LIFE_TIME_DAYS:number = 90;

		public static DoesCookieExist(): bool
		{
			return this.GetCookie() != null;
		}

		public static Login(callback:(success:bool) => void = null, serviceCaller:CHAOS.Portal.Client.IServiceCaller = null):void
		{ 
			var login = this.GetCookie();

			if (login == null)
			{
				if(callback != null) callback(false);
				return;
			}

			SecureCookie.Login(response => {
				if (response.Error == null)
				{
					this.SetCookie(response.Result.Results[0].GUID, response.Result.Results[0].PasswordGUID, this.COOKIE_LIFE_TIME_DAYS);
					if(callback != null) callback(true);
				}
				else
					if(callback != null) callback(false);
			}, login.GUID, login.PasswordGUID, serviceCaller);
		}

		public static Create(serviceCaller:CHAOS.Portal.Client.IServiceCaller = null):void
		{
			SecureCookie.Create(response =>
			{
				if(response.Error != null)
					this.SetCookie(response.Result.Results[0].GUID, response.Result.Results[0].PasswordGUID, this.COOKIE_LIFE_TIME_DAYS);
			}, serviceCaller);
		}

		public static Clear(): void
		{
			this.SetCookie("", "", -2);
		}

		private static GetCookie(): { GUID: string; PasswordGUID: string; }
		{
			var cookie = document.cookie;

			if (cookie == undefined || cookie == null)
				return null;

			var guidRegEx = /SecureCookieGUID\=(.+?)(?:;|$)/;
			var passwordRegex = /SecureCookieGUIDPassword\=(.+?)(?:;|$)/;

			var result = { GUID: "", PasswordGUID: "" };
			var match = guidRegEx.exec(cookie);

			if (match == null)
				return null;

			result.GUID = match[1];

			match = passwordRegex.exec(cookie);

			if (match == null)
				return null;

			result.PasswordGUID = match[1];

			return result;
		}

		private static SetCookie(guid:string, passwordGUID:string, expireInDays:number):void
		{
			var expireDate = new Date();
			expireDate.setDate(expireDate.getDate() + expireInDays);

			document.cookie = "SecureCookieGUID=" + (guid == null ? "" : guid) + "; expires=" + expireDate.toUTCString() + ";";
			document.cookie = "SecureCookieGUIDPassword=" + (passwordGUID == null ? "" : passwordGUID) + "; expires=" + expireDate.toUTCString() + ";";
		}
	}
}