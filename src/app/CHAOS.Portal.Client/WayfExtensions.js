var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var Wayf = (function () {
                function Wayf() {
                }
                Wayf.AuthenticationType = function () {
                    return "Wayf";
                };

                Wayf.LogIn = function (wayfServicePath, callbackUrl, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return {
                        Path: Wayf.BuildWayfServicePath(wayfServicePath, "LogIn", callbackUrl, serviceCaller),
                        Callback: function (status) {
                            if (status == 0)
                                serviceCaller.SetSessionAuthenticated(Wayf.AuthenticationType());
                        }
                    };
                };

                Wayf.LogOut = function (wayfServicePath, callbackUrl, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return {
                        Path: Wayf.BuildWayfServicePath(wayfServicePath, "LogOut", callbackUrl, serviceCaller),
                        Callback: function (status) {
                            if (status)
                                serviceCaller.UpdateSession(null);
                        }
                    };
                };

                Wayf.BuildWayfServicePath = function (wayfServicePath, wayfMethod, callbackUrl, serviceCaller) {
                    if (typeof callbackUrl === "undefined") { callbackUrl = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (!serviceCaller.HasSession())
                        throw new Error("Session not acquired");
                    if (wayfServicePath == null || wayfServicePath == "")
                        throw new Error("Parameter wayfServicePath cannot be null or empty");
                    if (callbackUrl == null || callbackUrl == "")
                        throw new Error("Parameter callbackUrl cannot be null or empty");

                    if (wayfServicePath.substr(wayfServicePath.length - 1, 1) != "/")
                        wayfServicePath += "/";

                    return wayfServicePath + wayfMethod + ".php?sessionGuid=" + serviceCaller.GetCurrentSession().Guid + "&apiPath=" + serviceCaller.GetServicePath() + "&callbackUrl=" + callbackUrl;
                };
                return Wayf;
            })();
            Client.Wayf = Wayf;
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//# sourceMappingURL=WayfExtensions.js.map
