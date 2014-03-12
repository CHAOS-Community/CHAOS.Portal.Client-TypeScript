var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var OAuth = (function () {
                function OAuth() {
                }
                OAuth.AuthenticationType = function () {
                    return "OAuth";
                };

                OAuth.Login = function (oAuthServicePath, target, callback, callbackUrl, serviceCaller) {
                    if (typeof callbackUrl === "undefined") { callbackUrl = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    var outerCallback = function (success) {
                        if (success)
                            serviceCaller.SetSessionAuthenticated(OAuth.AuthenticationType());

                        if (callback != null)
                            callback(success);
                    };

                    OAuth.CallOAuthService(oAuthServicePath, "Login", target, outerCallback, callbackUrl, serviceCaller);
                };

                OAuth.CallOAuthService = function (oAuthServicePath, method, target, callback, callbackUrl, serviceCaller) {
                    if (typeof callbackUrl === "undefined") { callbackUrl = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    var _this = this;
                    if (!serviceCaller.HasSession())
                        throw new Error("Session not acquired");
                    if (oAuthServicePath == null || oAuthServicePath == "")
                        throw new Error("Parameter oAuthServicePath cannot be null or empty");
                    if (target == null)
                        throw new Error("Parameter target cannot be null");

                    if (oAuthServicePath.substr(oAuthServicePath.length - 1, 1) != "/")
                        oAuthServicePath += "/";

                    var reporter;
                    var statusRequesterHandle;
                    var messageRecieved = function (event) {
                        if (event.data.indexOf("OAuthLoginStatus: ") != 0)
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

                    var location = oAuthServicePath + "Authentication/" + method + "?sessionGuid=" + serviceCaller.GetCurrentSession().Guid;

                    if (callbackUrl != null)
                        location += "&callbackUrl=" + callbackUrl;

                    if (target.location !== undefined && target.location.href !== undefined) {
                        if (target.postMessage) {
                            statusRequesterHandle = setInterval(function () {
                                try  {
                                    target.postMessage("OAuthLoginStatusRequest", "*");
                                } catch (error) {
                                    clearInterval(statusRequesterHandle); //cross domain not allowed
                                    statusRequesterHandle = null;
                                }
                            }, 200);
                        }

                        var sessionChecker = function () {
                            return CHAOS.Portal.Client.User.Get(null, null, serviceCaller).WithCallback(function (response) {
                                if (reporter == null)
                                    return;

                                if (response.Error == null)
                                    reporter(true);
                                else
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
                return OAuth;
            })();
            Client.OAuth = OAuth;
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//# sourceMappingURL=OAuthExntesions.js.map
