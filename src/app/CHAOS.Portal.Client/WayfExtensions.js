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

                Wayf.Login = function (wayfServicePath, target, callback, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    if (!serviceCaller.HasSession())
                        throw new Error("Session not acquired");
                    if (wayfServicePath == null || wayfServicePath == "")
                        throw new Error("Parameter wayfServicePath cannot be null or empty");
                    if (target == null)
                        throw new Error("Parameter frame cannot be null");

                    if (wayfServicePath.substr(wayfServicePath.length - 1, 1) != "/")
                        wayfServicePath += "/";

                    var messageRecieved = function (event) {
                        window.removeEventListener("message", messageRecieved, false);

                        var success = event.data == "success";

                        if (success)
                            serviceCaller.SetSessionAuthenticated(Wayf.AuthenticationType());

                        if (callback != null)
                            callback(success);
                    };

                    window.addEventListener("message", messageRecieved, false);
                    var location = wayfServicePath + "?sessionGuid=" + serviceCaller.GetCurrentSession().Guid + "&apiPath=" + serviceCaller.GetServicePath();

                    if (target.location !== undefined && target.location.href !== undefined)
                        target.location.href = location;
else if (target.src !== undefined)
                        target.src = location;
else
                        throw new Error("Unknown target type");
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
