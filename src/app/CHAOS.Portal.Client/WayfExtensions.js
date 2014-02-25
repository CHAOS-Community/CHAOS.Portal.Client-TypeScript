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

                Wayf.LogIn = function (wayfServicePath, target, callback, callbackUrl, serviceCaller) {
                    if (typeof callbackUrl === "undefined") { callbackUrl = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    var outerCallback = function (success) {
                        if (success)
                            serviceCaller.SetSessionAuthenticated(Wayf.AuthenticationType());

                        callback(success);
                    };

                    Wayf.CallWayfService(wayfServicePath, "LogIn", target, outerCallback, callbackUrl, serviceCaller);
                };

                Wayf.LogOut = function (wayfServicePath, target, callback, callbackUrl, serviceCaller) {
                    if (typeof callbackUrl === "undefined") { callbackUrl = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    var outerCallback = function (success) {
                        if (success)
                            serviceCaller.UpdateSession(null);

                        callback(success);
                    };

                    Wayf.CallWayfService(wayfServicePath, "LogOut", target, outerCallback, callbackUrl, serviceCaller);
                };

                Wayf.CallWayfService = function (wayfServicePath, wayfMethod, target, callback, callbackUrl, serviceCaller) {
                    if (typeof callbackUrl === "undefined") { callbackUrl = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    var _this = this;
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    if (!serviceCaller.HasSession())
                        throw new Error("Session not acquired");
                    if (wayfServicePath == null || wayfServicePath == "")
                        throw new Error("Parameter wayfServicePath cannot be null or empty");
                    if (target == null)
                        throw new Error("Parameter target cannot be null");

                    if (wayfServicePath.substr(wayfServicePath.length - 1, 1) != "/")
                        wayfServicePath += "/";

                    var reporter;
                    var statusRequesterHandle;
                    var messageRecieved = function (event) {
                        if (event.data.indexOf("WayfStatus: ") != 0)
                            return;

                        if (reporter != null)
                            reporter(event.data.substr(12) == "success");
                    };

                    reporter = function (success) {
                        reporter = null;
                        window.removeEventListener("message", messageRecieved, false);
                        if (statusRequesterHandle != null)
                            clearInterval(statusRequesterHandle);

                        if (callback != null)
                            callback(success);
                    };

                    window.addEventListener("message", messageRecieved, false);

                    var location = wayfServicePath + wayfMethod + ".php?sessionGuid=" + serviceCaller.GetCurrentSession().Guid + "&apiPath=" + serviceCaller.GetServicePath();

                    if (callbackUrl != null)
                        location += "&callbackUrl=" + callbackUrl;

                    if (target.location !== undefined && target.location.href !== undefined) {
                        if (target.postMessage) {
                            statusRequesterHandle = setInterval(function () {
                                try  {
                                    target.postMessage("WayfStatusRequest", "*");
                                } catch (error) {
                                    clearInterval(statusRequesterHandle); //cross domain not allowed
                                    statusRequesterHandle = null;
                                }
                            }, 200);
                        }

                        var sessionChecker = function () {
                            return CHAOS.Portal.Client.User.Get(null, null, serviceCaller).WithCallback(function (response) {
                                if (response.Error == null) {
                                    if (reporter != null)
                                        reporter(true);
                                } else
                                    setTimeout(sessionChecker, 1000);
                            }, _this);
                        };

                        setTimeout(sessionChecker, 2000);

                        target.location.href = location;
                    } else if (target.src !== undefined)
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
