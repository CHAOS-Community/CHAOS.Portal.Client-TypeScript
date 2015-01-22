module CHAOS.Portal.Client
{
	export class Wayf
	{
		public static AuthenticationType(): string { return "Wayf"; }

		public static LogIn(wayfServicePath: string, callbackUrl: string, serviceCaller: IServiceCaller = null): WayfCallInfo
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return {
				Path: Wayf.BuildWayfServicePath(wayfServicePath, "LogIn", callbackUrl, serviceCaller),
				Callback: (status: number) => { if (status == 0) serviceCaller.SetSessionAuthenticated(Wayf.AuthenticationType()); }
			}
		}

		public static LogOut(wayfServicePath: string, callbackUrl: string, serviceCaller: IServiceCaller = null): WayfCallInfo
		{
			if (serviceCaller == null)
				serviceCaller = ServiceCallerService.GetDefaultCaller();

			return {
				Path: Wayf.BuildWayfServicePath(wayfServicePath, "LogOut", callbackUrl, serviceCaller),
				Callback: (status:number) => { if (status) serviceCaller.UpdateSession(null); }
			}
		}

		private static BuildWayfServicePath(wayfServicePath:string, wayfMethod:string, callbackUrl:string = null, serviceCaller:IServiceCaller = null):string
		{
			if (!serviceCaller.HasSession()) throw new Error("Session not acquired");
			if (wayfServicePath == null || wayfServicePath == "") throw new Error("Parameter wayfServicePath cannot be null or empty");
			if (callbackUrl == null || callbackUrl == "") throw new Error("Parameter callbackUrl cannot be null or empty");

			if (wayfServicePath.substr(wayfServicePath.length - 1, 1) != "/")
				wayfServicePath += "/";

			return wayfServicePath + wayfMethod + ".php?sessionGuid=" + serviceCaller.GetCurrentSession().Guid + "&apiPath=" + serviceCaller.GetServicePath() + "&callbackUrl=" + callbackUrl;
		}
	}

	export interface WayfCallInfo
	{
		Path: string;
		Callback:(status:number)=>void;
	}
}