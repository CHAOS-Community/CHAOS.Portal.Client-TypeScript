module CHAOS.Portal.Client
{
	export class Wayf
	{
		public static AuthenticationType(): string { return "Wayf"; }

		public static Login(wayfServicePath: string, frame: HTMLIFrameElement, callback: (success: boolean) => void, serviceCaller: IServiceCaller = null)
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			if (!serviceCaller.HasSession())						throw new Error("Session not acquired");
			if (wayfServicePath == null || wayfServicePath == "")	throw new Error("Parameter wayfServicePath cannot be null or empty");
			if (frame == null)										throw new Error("Parameter frame cannot be null");

			if (wayfServicePath.substr(wayfServicePath.length - 1, 1) != "/")
				wayfServicePath += "/";

			var messageRecieved = (event: MessageEvent) =>
			{
				window.removeEventListener("message", messageRecieved, false);

				var success = event.data == "success";

				if (success)
					serviceCaller.SetSessionAuthenticated(Wayf.AuthenticationType());

				if(callback != null)
					callback(success);
			};

			window.addEventListener("message", messageRecieved, false);

			frame.src = wayfServicePath + "?sessionGuid=" + serviceCaller.GetCurrentSession().Guid + "&apiPath=" + serviceCaller.GetServicePath();
		}
	}
}