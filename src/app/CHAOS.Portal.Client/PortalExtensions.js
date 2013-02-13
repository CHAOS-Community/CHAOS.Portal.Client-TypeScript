var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var Session = (function () {
                function Session() { }
                Session.Create = function Create(callback, serviceCaller) {
                    if (typeof callback === "undefined") { callback = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    var outerCallback = function (response) {
                        if(response.Error == null) {
                            serviceCaller.UpdateSession(response.Result.Results[0]);
                        }
                        if(callback != null) {
                            callback(response);
                        }
                    };
                    serviceCaller.CallService(outerCallback, "Session/Create", Client.HttpMethod.Post(), null, false);
                }
                return Session;
            })();
            Client.Session = Session;            
            var EmailPassword = (function () {
                function EmailPassword() { }
                EmailPassword.AuthenticationType = function AuthenticationType() {
                    return "EmailPassword";
                }
                EmailPassword.Login = function Login(callback, email, password, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    var outerCallback = function (response) {
                        if(response.Error == null) {
                            serviceCaller.SetSessionAuthenticated(EmailPassword.AuthenticationType());
                        }
                        if(callback != null) {
                            callback(response);
                        }
                    };
                    serviceCaller.CallService(outerCallback, "EmailPassword/Login", Client.HttpMethod.Get(), {
                        email: email,
                        password: password
                    }, true);
                }
                return EmailPassword;
            })();
            Client.EmailPassword = EmailPassword;            
            var SecureCookie = (function () {
                function SecureCookie() { }
                SecureCookie.AuthenticationType = function AuthenticationType() {
                    return "SecureCookie";
                }
                SecureCookie.Create = function Create(callback, serviceCaller) {
                    if (typeof callback === "undefined") { callback = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    serviceCaller.CallService(callback, "SecureCookie/Create", Client.HttpMethod.Get(), null, true);
                }
                SecureCookie.Login = function Login(callback, guid, passwordGUID, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    var outerCallback = function (response) {
                        if(response.Error == null) {
                            serviceCaller.SetSessionAuthenticated(SecureCookie.AuthenticationType());
                        }
                        if(callback != null) {
                            callback(response);
                        }
                    };
                    serviceCaller.CallService(outerCallback, "SecureCookie/Login", Client.HttpMethod.Get(), {
                        guid: guid,
                        passwordGUID: passwordGUID
                    }, true);
                }
                return SecureCookie;
            })();
            Client.SecureCookie = SecureCookie;            
            function Initialize(servicePath, clientGUID, autoCreateSession) {
                if (typeof clientGUID === "undefined") { clientGUID = null; }
                if (typeof autoCreateSession === "undefined") { autoCreateSession = true; }
                var client = new Client.PortalClient(servicePath, clientGUID);
                if(autoCreateSession) {
                    Session.Create(null, client);
                }
                ServiceCallerService.SetDefaultCaller(client);
                return client;
            }
            Client.Initialize = Initialize;
            var ServiceCallerService = (function () {
                function ServiceCallerService() { }
                ServiceCallerService._defaultCaller = null;
                ServiceCallerService.GetDefaultCaller = function GetDefaultCaller() {
                    if(ServiceCallerService._defaultCaller == null) {
                        throw new Error("Default service caller not set");
                    }
                    return ServiceCallerService._defaultCaller;
                }
                ServiceCallerService.SetDefaultCaller = function SetDefaultCaller(value) {
                    ServiceCallerService._defaultCaller = value;
                }
                return ServiceCallerService;
            })();
            Client.ServiceCallerService = ServiceCallerService;            
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//@ sourceMappingURL=PortalExtensions.js.map
