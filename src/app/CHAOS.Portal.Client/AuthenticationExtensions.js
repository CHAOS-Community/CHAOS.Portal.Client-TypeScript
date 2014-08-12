var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var EmailPassword = (function () {
                function EmailPassword() {
                }
                EmailPassword.AuthenticationType = function () {
                    return "EmailPassword";
                };

                EmailPassword.Login = function (email, password, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("EmailPassword/Login", 1 /* Post */, { email: email, password: password }).WithCallback(function (response) {
                        if (response.Error == null)
                            serviceCaller.SetSessionAuthenticated(EmailPassword.AuthenticationType(), response.Body.Results[0].Guid, response.Body.Results[0].SessionDateModified);
                    });
                };

                EmailPassword.SetPassword = function (userGuid, newPassword, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("EmailPassword/SetPassword", 1 /* Post */, { userGuid: userGuid, newPassword: newPassword });
                };
                return EmailPassword;
            })();
            Client.EmailPassword = EmailPassword;

            var SecureCookie = (function () {
                function SecureCookie() {
                }
                SecureCookie.AuthenticationType = function () {
                    return "SecureCookie";
                };

                SecureCookie.Create = function (serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("SecureCookie/Create");
                };

                SecureCookie.Login = function (guid, passwordGuid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("SecureCookie/Login", 1 /* Post */, { guid: guid, passwordGuid: passwordGuid }).WithCallback(function (response) {
                        if (response.Error == null) {
                            serviceCaller.SetSessionAuthenticated(SecureCookie.AuthenticationType(), null, null);
                            Client.Session.Get(serviceCaller); //Make sure cached session is updated
                        }
                    });
                };
                return SecureCookie;
            })();
            Client.SecureCookie = SecureCookie;

            var Facebook = (function () {
                function Facebook() {
                }
                Facebook.AuthenticationType = function () {
                    return "Facebook";
                };

                Facebook.Login = function (signedRequest, userAccessToken, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Facebook/Login", 1 /* Post */, { signedRequest: signedRequest, userAccessToken: userAccessToken }).WithCallback(function (response) {
                        if (response.Error == null) {
                            serviceCaller.SetSessionAuthenticated(Facebook.AuthenticationType(), response.Body.Results[0].UserGuid, null);
                            Client.Session.Get(serviceCaller); //Make sure cached session is updated
                        }
                    });
                };
                return Facebook;
            })();
            Client.Facebook = Facebook;

            var AuthKey = (function () {
                function AuthKey() {
                }
                AuthKey.AuthenticationType = function () {
                    return "AuthKey";
                };

                AuthKey.Create = function (name, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("AuthKey/Create", 0 /* Get */, { name: name });
                };

                AuthKey.Login = function (token, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("AuthKey/Login", 1 /* Post */, { token: token }).WithCallback(function (response) {
                        if (response.Error == null) {
                            serviceCaller.SetSessionAuthenticated(AuthKey.AuthenticationType(), response.Body.Results[0].UserGuid, null);
                            Client.Session.Get(serviceCaller); //Make sure cached session is updated
                        }
                    });
                };

                AuthKey.Get = function (serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("AuthKey/Get");
                };

                AuthKey.Delete = function (name, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("AuthKey/Delete", 0 /* Get */, { name: name });
                };
                return AuthKey;
            })();
            Client.AuthKey = AuthKey;

            var OAuth = (function () {
                function OAuth() {
                }
                OAuth.AuthenticationType = function () {
                    return "OAuth";
                };

                OAuth.GetLoginEndPoint = function (callbackUrl, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("OAuth/GetLoginEndPoint", 0 /* Get */, { callbackUrl: callbackUrl }, true);
                };

                OAuth.ProcessLogin = function (callbackUrl, responseUrl, stateCode, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("OAuth/ProcessLogin", 0 /* Get */, { callbackUrl: callbackUrl, responseUrl: responseUrl, stateCode: stateCode }, true).WithCallback(function (response) {
                        if (response.Error == null) {
                            var session = response.Body.Results[0];

                            serviceCaller.SetSessionAuthenticated(OAuth.AuthenticationType(), session.UserGuid, session.DateModified);
                        }
                    });
                };
                return OAuth;
            })();
            Client.OAuth = OAuth;
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//# sourceMappingURL=AuthenticationExtensions.js.map
