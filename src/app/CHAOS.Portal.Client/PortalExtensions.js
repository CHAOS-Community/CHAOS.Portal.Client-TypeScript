var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var Session = (function () {
                function Session() { }
                Session.Create = function Create(serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Session/Create", Client.HttpMethod.Get(), null, false).WithCallback(function (response) {
                        if(response.Error == null) {
                            serviceCaller.UpdateSession(response.Result.Results[0]);
                        }
                    });
                };
                return Session;
            })();
            Client.Session = Session;            
            var EmailPassword = (function () {
                function EmailPassword() { }
                EmailPassword.AuthenticationType = function AuthenticationType() {
                    return "EmailPassword";
                };
                EmailPassword.Login = function Login(email, password, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("EmailPassword/Login", Client.HttpMethod.Get(), {
                        email: email,
                        password: password
                    }, true).WithCallback(function (response) {
                        if(response.Error == null) {
                            serviceCaller.SetSessionAuthenticated(EmailPassword.AuthenticationType());
                        }
                    });
                };
                return EmailPassword;
            })();
            Client.EmailPassword = EmailPassword;            
            var SecureCookie = (function () {
                function SecureCookie() { }
                SecureCookie.AuthenticationType = function AuthenticationType() {
                    return "SecureCookie";
                };
                SecureCookie.Create = function Create(serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("SecureCookie/Create", Client.HttpMethod.Get(), null, true);
                };
                SecureCookie.Login = function Login(guid, passwordGuid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("SecureCookie/Login", Client.HttpMethod.Get(), {
                        guid: guid,
                        passwordGuid: passwordGuid
                    }, true).WithCallback(function (response) {
                        if(response.Error == null) {
                            serviceCaller.SetSessionAuthenticated(SecureCookie.AuthenticationType());
                        }
                    });
                };
                return SecureCookie;
            })();
            Client.SecureCookie = SecureCookie;            
            var User = (function () {
                function User() { }
                User.Get = function Get(serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("User/Get", Client.HttpMethod.Get(), null, true);
                };
                User.GetCurrent = function GetCurrent(serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("View/GetCurrent", Client.HttpMethod.Get(), null, true);
                };
                return User;
            })();
            Client.User = User;            
            var Group = (function () {
                function Group() { }
                Group.Get = function Get(serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Group/Get", Client.HttpMethod.Get(), null, true);
                };
                Group.Create = function Create(name, systemPermission, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Group/Create", Client.HttpMethod.Get(), {
                        name: name,
                        systemPermission: systemPermission
                    }, true);
                };
                Group.Update = function Update(guid, newName, newSystemPermission, serviceCaller) {
                    if (typeof newSystemPermission === "undefined") { newSystemPermission = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Group/Update", Client.HttpMethod.Get(), {
                        guid: guid,
                        newName: newName,
                        newSystemPermission: newSystemPermission
                    }, true);
                };
                Group.Delete = function Delete(guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Group/Delete", Client.HttpMethod.Get(), {
                        guid: guid
                    }, true);
                };
                return Group;
            })();
            Client.Group = Group;            
            var View = (function () {
                function View() { }
                View.Get = function Get(view, query, sort, pageIndex, pageSize, serviceCaller) {
                    if (typeof query === "undefined") { query = null; }
                    if (typeof sort === "undefined") { sort = null; }
                    if (typeof pageIndex === "undefined") { pageIndex = 0; }
                    if (typeof pageSize === "undefined") { pageSize = 10; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("View/Get", Client.HttpMethod.Get(), {
                        view: view,
                        query: query,
                        sort: sort,
                        pageIndex: pageIndex,
                        pageSize: pageSize
                    }, true);
                };
                View.List = function List(serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("View/List", Client.HttpMethod.Get(), null, true);
                };
                return View;
            })();
            Client.View = View;            
            function Initialize(servicePath, clientGUID, autoCreateSession) {
                if (typeof clientGUID === "undefined") { clientGUID = null; }
                if (typeof autoCreateSession === "undefined") { autoCreateSession = true; }
                var client = new Client.PortalClient(servicePath, clientGUID);
                if(autoCreateSession) {
                    Session.Create(client);
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
                };
                ServiceCallerService.SetDefaultCaller = function SetDefaultCaller(value) {
                    ServiceCallerService._defaultCaller = value;
                };
                return ServiceCallerService;
            })();
            Client.ServiceCallerService = ServiceCallerService;            
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
