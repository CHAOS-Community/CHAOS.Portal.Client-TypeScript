var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        /// <reference path="Data.ts" />
        /// <reference path="PortalClient.ts"/>
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

                    return serviceCaller.CallService("EmailPassword/Login", Client.HttpMethod.Post, { email: email, password: password }).WithCallback(function (response) {
                        if (response.Error == null)
                            serviceCaller.SetSessionAuthenticated(EmailPassword.AuthenticationType(), response.Body.Results[0].Guid, response.Body.Results[0].SessionDateModified);
                    });
                };

                EmailPassword.SetPassword = function (userGuid, newPassword, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("EmailPassword/SetPassword", Client.HttpMethod.Post, { userGuid: userGuid, newPassword: newPassword });
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

                    return serviceCaller.CallService("SecureCookie/Login", Client.HttpMethod.Post, { guid: guid, passwordGuid: passwordGuid }).WithCallback(function (response) {
                        if (response.Error == null) {
                            serviceCaller.SetSessionAuthenticated(SecureCookie.AuthenticationType(), null, null);
                            Client.Session.Get(serviceCaller);
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

                    return serviceCaller.CallService("Facebook/Login", Client.HttpMethod.Post, { signedRequest: signedRequest, userAccessToken: userAccessToken }).WithCallback(function (response) {
                        if (response.Error == null) {
                            serviceCaller.SetSessionAuthenticated(Facebook.AuthenticationType(), response.Body.Results[0].UserGuid, null);
                            Client.Session.Get(serviceCaller);
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

                    return serviceCaller.CallService("AuthKey/Create", Client.HttpMethod.Get, { name: name });
                };

                AuthKey.Login = function (token, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("AuthKey/Login", Client.HttpMethod.Post, { token: token }).WithCallback(function (response) {
                        if (response.Error == null) {
                            serviceCaller.SetSessionAuthenticated(AuthKey.AuthenticationType(), response.Body.Results[0].UserGuid, null);
                            Client.Session.Get(serviceCaller);
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

                    return serviceCaller.CallService("AuthKey/Delete", Client.HttpMethod.Get, { name: name });
                };
                return AuthKey;
            })();
            Client.AuthKey = AuthKey;
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//# sourceMappingURL=AuthenticationExtensions.js.map
