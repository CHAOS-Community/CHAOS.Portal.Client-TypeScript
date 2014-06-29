module CHAOS.Portal.Client
{
	export class Wayf
	{
		public static AuthenticationType(): string { return "Wayf"; }

		public static LogIn(wayfServicePath: string, target: any, callback: (status: number) => void, callbackUrl:string = null, serviceCaller: IServiceCaller = null):void
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			var outerCallback = (status:number)=>
			{
				if (status == 0)
					serviceCaller.SetSessionAuthenticated(Wayf.AuthenticationType());

				callback(status);
			};

			Wayf.CallWayfService(wayfServicePath, "LogIn", target, outerCallback, callbackUrl, serviceCaller);
		}

		public static LogOut(wayfServicePath: string, target: any, callback: (status: number) => void, callbackUrl: string = null, serviceCaller: IServiceCaller = null): void
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			var outerCallback = (status: number) =>
			{
				if (status)
					serviceCaller.UpdateSession(null);

				callback(status);
			};

			Wayf.CallWayfService(wayfServicePath, "LogOut", target, outerCallback, callbackUrl, serviceCaller);
		}

		private static CallWayfService(wayfServicePath:string, wayfMethod:string, target:any, callback:(status:number)=> void, callbackUrl:string = null, serviceCaller:IServiceCaller = null):void
		{
			if (!serviceCaller.HasSession()) throw new Error("Session not acquired");
			if (wayfServicePath == null || wayfServicePath == "") throw new Error("Parameter wayfServicePath cannot be null or empty");
			if (target == null) throw new Error("Parameter target cannot be null");

			if (wayfServicePath.substr(wayfServicePath.length - 1, 1) != "/")
				wayfServicePath += "/";

			var reporter: (status: number) => void;
			var statusRequesterHandle: number = null;
			var messageRecieved = (event: MessageEvent) =>
			{
				if (event.data.indexOf("WayfStatus: ") != 0) return;

				if (reporter != null)
					reporter(parseInt(event.data.substr(12)));

			};

			reporter = (status: number) =>
			{
				reporter = null;
				window.removeEventListener("message", messageRecieved, false);
				if (statusRequesterHandle != null) clearInterval(statusRequesterHandle);

				if (callback != null)
					callback(status);
			};

			window.addEventListener("message", messageRecieved, false);

			var location = wayfServicePath + wayfMethod + ".php?sessionGuid=" + serviceCaller.GetCurrentSession().Guid + "&apiPath=" + serviceCaller.GetServicePath();

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
							target.postMessage("WayfStatusRequest", "*");
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
							reporter(0);
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