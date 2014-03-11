module CHAOS.Portal.Client
{
	export class OAuth
	{
		public static AuthenticationType(): string { return "OAuth"; }

		public static Login(oAuthServicePath: string, target: any, callback: (success: boolean) => void, callbackUrl: string = null, serviceCaller: IServiceCaller = null): void
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			var outerCallback = (success: boolean) =>
			{
				if (success)
					serviceCaller.SetSessionAuthenticated(OAuth.AuthenticationType());

				if(callback != null)
					callback(success);
			};

			OAuth.CallOAuthService(oAuthServicePath, "Login", target, outerCallback, callbackUrl, serviceCaller);
		}

		private static CallOAuthService(oAuthServicePath: string, method: string, target: any, callback: (success: boolean) => void, callbackUrl: string = null, serviceCaller: IServiceCaller = null): void
		{
			if (!serviceCaller.HasSession()) throw new Error("Session not acquired");
			if (oAuthServicePath == null || oAuthServicePath == "") throw new Error("Parameter oAuthServicePath cannot be null or empty");
			if (target == null) throw new Error("Parameter target cannot be null");

			if (oAuthServicePath.substr(oAuthServicePath.length - 1, 1) != "/")
				oAuthServicePath += "/";

			var reporter: (success: boolean) => void;
			var statusRequesterHandle: number;
			var messageRecieved = (event: MessageEvent) =>
			{
				if (event.data.indexOf("OAuthLoginStatus: ") != 0) return;

				if (reporter != null)
					reporter(event.data.substr(12) == "success");
			};

			reporter = (success: boolean) =>
			{
				reporter = null;
				window.removeEventListener("message", messageRecieved, false);
				if (statusRequesterHandle != null) clearInterval(statusRequesterHandle);

				if (callback != null)
					callback(success);
			};

			window.addEventListener("message", messageRecieved, false);

			var location = oAuthServicePath + "Authentication/" + method + "?sessionGuid=" + serviceCaller.GetCurrentSession().Guid;

			if (callbackUrl != null)
				location += "&callbackUrl=" + callbackUrl;

			if (target.location !== undefined && target.location.href !== undefined) //using window
			{
				if (target.postMessage)
				{
					statusRequesterHandle = setInterval(() =>
					{
						try
						{
							target.postMessage("OAuthLoginStatusRequest", "*");
						}
						catch (error)
						{
							clearInterval(statusRequesterHandle); //cross domain not allowed
							statusRequesterHandle = null;
						}
					}, 200);
				}

				var sessionChecker = () => CHAOS.Portal.Client.User.Get(null, null, serviceCaller).WithCallback(response =>
				{
					if (response.Error == null)
					{
						if (reporter != null)
							reporter(true);
					}
					else
						setTimeout(sessionChecker, 1000);
				}, this);

				setTimeout(sessionChecker, 2000);

				target.location.href = location;
			}
			else if (target.src !== undefined) //using iframe
				target.src = location;
			else
				throw new Error("Unknown target type");
		}
	}
}