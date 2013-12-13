module CHAOS.Portal.Client
{
	export class Wayf
	{
		public static AuthenticationType(): string { return "Wayf"; }

		public static Login(wayfServicePath: string, target: any, callback: (success: boolean) => void, callbackUrl:string = null, serviceCaller: IServiceCaller = null)
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			if (!serviceCaller.HasSession())						throw new Error("Session not acquired");
			if (wayfServicePath == null || wayfServicePath == "")	throw new Error("Parameter wayfServicePath cannot be null or empty");
			if (target == null)										throw new Error("Parameter frame cannot be null");

			if (wayfServicePath.substr(wayfServicePath.length - 1, 1) != "/")
				wayfServicePath += "/";

			var reporter = null;
			var statusRequester = null;
			var messageRecieved = (event: MessageEvent) =>
			{
				if (event.data.indexOf("WayfStatus: ") != 0) return;

				if(reporter != null)
					reporter(event.data.substr(12) == "success");
			};

			reporter = (success: boolean) =>
			{
				reporter = null;
				window.removeEventListener("message", messageRecieved, false);
				if (statusRequester != null) clearInterval(statusRequester);

				if (success)
					serviceCaller.SetSessionAuthenticated(Wayf.AuthenticationType());

				if (callback != null)
					callback(success);
			};

			window.addEventListener("message", messageRecieved, false);

			var location = wayfServicePath + "Login.php?sessionGuid=" + serviceCaller.GetCurrentSession().Guid + "&apiPath=" + serviceCaller.GetServicePath();

			if (callbackUrl != null)
				location += "&callbackUrl=" + callbackUrl;

			if (target.location !== undefined && target.location.href !== undefined) //using window
			{
				if (target.postMessage)
				{
					statusRequester = setInterval(() =>
					{
						try
						{
							target.postMessage("WayfStatusRequest", "*");
						}
						catch (error)
						{
							clearInterval(statusRequester); //cross domain not allowed
							statusRequester = null;
						}
					}, 200);
				}

				var sessionChecker = () => CHAOS.Portal.Client.User.Get(null, null,serviceCaller).WithCallback(response =>
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