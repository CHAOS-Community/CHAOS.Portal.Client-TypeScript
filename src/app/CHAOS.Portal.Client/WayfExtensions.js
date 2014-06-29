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
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    var outerCallback = function (status) {
                        if (status == 0)
                            serviceCaller.SetSessionAuthenticated(Wayf.AuthenticationType());

                        callback(status);
                    };

                    Wayf.CallWayfService(wayfServicePath, "LogIn", target, outerCallback, callbackUrl, serviceCaller);
                };

                Wayf.LogOut = function (wayfServicePath, target, callback, callbackUrl, serviceCaller) {
                    if (typeof callbackUrl === "undefined") { callbackUrl = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    var outerCallback = function (status) {
                        if (status)
                            serviceCaller.UpdateSession(null);

                        callback(status);
                    };

                    Wayf.CallWayfService(wayfServicePath, "LogOut", target, outerCallback, callbackUrl, serviceCaller);
                };

                Wayf.CallWayfService = function (wayfServicePath, wayfMethod, target, callback, callbackUrl, serviceCaller) {
                    var _this = this;
                    if (typeof callbackUrl === "undefined") { callbackUrl = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (!serviceCaller.HasSession())
                        throw new Error("Session not acquired");
                    if (wayfServicePath == null || wayfServicePath == "")
                        throw new Error("Parameter wayfServicePath cannot be null or empty");
                    if (target == null)
                        throw new Error("Parameter target cannot be null");

                    if (wayfServicePath.substr(wayfServicePath.length - 1, 1) != "/")
                        wayfServicePath += "/";

                    var reporter;
                    var statusRequesterHandle = null;
                    var messageRecieved = function (event) {
                        if (event.data.indexOf("WayfStatus: ") != 0)
                            return;

                        if (reporter != null)
                            reporter(parseInt(event.data.substr(12)));
                    };

                    reporter = function (status) {
                        reporter = null;
                        window.removeEventListener("message", messageRecieved, false);
                        if (statusRequesterHandle != null)
                            clearInterval(statusRequesterHandle);

                        if (callback != null)
                            callback(status);
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
                                    clearInterval(statusRequesterHandle);
                                    statusRequesterHandle = null;
                                }
                            }, 200);
                        }

                        var sessionChecker = function () {
                            return CHAOS.Portal.Client.User.Get(null, null, serviceCaller).WithCallback(function (response) {
                                if (response.Error == null) {
                                    if (reporter != null)
                                        reporter(0);
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
