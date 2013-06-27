var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var Session = (function () {
                function Session() {
                }
                Session.Create = function (serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Session/Create", Client.HttpMethod.Get(), null, false).WithCallback(function (response) {
                        if (response.Error == null)
                            serviceCaller.UpdateSession(response.Result.Results[0]);
                    });
                };
                return Session;
            })();
            Client.Session = Session;

            var EmailPassword = (function () {
                function EmailPassword() {
                }
                EmailPassword.AuthenticationType = function () {
                    return "EmailPassword";
                };

                EmailPassword.Login = function (email, password, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("EmailPassword/Login", Client.HttpMethod.Get(), { email: email, password: password }, true).WithCallback(function (response) {
                        if (response.Error == null)
                            serviceCaller.SetSessionAuthenticated(EmailPassword.AuthenticationType());
                    });
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
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("SecureCookie/Create", Client.HttpMethod.Get(), null, true);
                };

                SecureCookie.Login = function (guid, passwordGuid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("SecureCookie/Login", Client.HttpMethod.Get(), { guid: guid, passwordGuid: passwordGuid }, true).WithCallback(function (response) {
                        if (response.Error == null)
                            serviceCaller.SetSessionAuthenticated(SecureCookie.AuthenticationType());
                    });
                };
                return SecureCookie;
            })();
            Client.SecureCookie = SecureCookie;

            var User = (function () {
                function User() {
                }
                User.Create = function (guid, email, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("User/Create", Client.HttpMethod.Post(), { guid: guid, email: email }, true);
                };

                User.Update = function (guid, email, permissons, serviceCaller) {
                    if (typeof permissons === "undefined") { permissons = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("User/Update", Client.HttpMethod.Post(), { guid: guid, email: email, permissons: permissons }, true);
                };

                User.Delete = function (guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("User/Delete", Client.HttpMethod.Get(), { guid: guid }, true);
                };

                User.Get = function (guid, groupGuid, serviceCaller) {
                    if (typeof guid === "undefined") { guid = null; }
                    if (typeof groupGuid === "undefined") { groupGuid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("User/Get", Client.HttpMethod.Get(), { guid: guid, groupGuid: groupGuid }, true);
                };

                User.GetCurrent = function (serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("User/GetCurrent", Client.HttpMethod.Get(), null, true);
                };
                return User;
            })();
            Client.User = User;

            var Group = (function () {
                function Group() {
                }
                Group.Get = function (guid, userGuid, serviceCaller) {
                    if (typeof guid === "undefined") { guid = null; }
                    if (typeof userGuid === "undefined") { userGuid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Group/Get", Client.HttpMethod.Get(), { guid: guid, userGuid: userGuid }, true);
                };

                Group.Create = function (name, systemPermission, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Group/Create", Client.HttpMethod.Get(), { name: name, systemPermission: systemPermission }, true);
                };

                Group.Update = function (guid, newName, newSystemPermission, serviceCaller) {
                    if (typeof newSystemPermission === "undefined") { newSystemPermission = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Group/Update", Client.HttpMethod.Get(), { guid: guid, newName: newName, newSystemPermission: newSystemPermission }, true);
                };

                Group.Delete = function (guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Group/Delete", Client.HttpMethod.Get(), { guid: guid }, true);
                };

                Group.AddUser = function (guid, userGuid, permissions, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Group/AddUser", Client.HttpMethod.Get(), { guid: guid, userGuid: userGuid, permissions: permissions }, true);
                };

                Group.RemoveUser = function (guid, userGuid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Group/RemoveUser", Client.HttpMethod.Get(), { guid: guid, userGuid: userGuid }, true);
                };

                Group.UpdateUserPermissions = function (guid, userGuid, permissions, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Group/UpdateUserPermissions", Client.HttpMethod.Get(), { guid: guid, userGuid: userGuid, permissions: permissions }, true);
                };
                return Group;
            })();
            Client.Group = Group;

            var View = (function () {
                function View() {
                }
                View.Get = function (view, query, sort, pageIndex, pageSize, serviceCaller) {
                    if (typeof query === "undefined") { query = null; }
                    if (typeof sort === "undefined") { sort = null; }
                    if (typeof pageIndex === "undefined") { pageIndex = 0; }
                    if (typeof pageSize === "undefined") { pageSize = 10; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("View/Get", Client.HttpMethod.Get(), { view: view, query: query, sort: sort, pageIndex: pageIndex, pageSize: pageSize }, true);
                };

                View.List = function (serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("View/List", Client.HttpMethod.Get(), null, true);
                };
                return View;
            })();
            Client.View = View;

            var ClientSettings = (function () {
                function ClientSettings() {
                }
                ClientSettings.Get = function (guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("ClientSettings/Get", Client.HttpMethod.Get(), { guid: guid }, true);
                };

                ClientSettings.Set = function (guid, name, settings, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("ClientSettings/Set", Client.HttpMethod.Post(), { guid: guid, name: name, settings: settings }, true);
                };
                return ClientSettings;
            })();
            Client.ClientSettings = ClientSettings;

            function Initialize(servicePath, clientGUID, autoCreateSession) {
                if (typeof clientGUID === "undefined") { clientGUID = null; }
                if (typeof autoCreateSession === "undefined") { autoCreateSession = true; }
                var client = new Client.PortalClient(servicePath, clientGUID);

                if (autoCreateSession)
                    Session.Create(client);

                ServiceCallerService.SetDefaultCaller(client);

                return client;
            }
            Client.Initialize = Initialize;

            var ServiceCallerService = (function () {
                function ServiceCallerService() {
                }
                ServiceCallerService.GetDefaultCaller = function () {
                    if (ServiceCallerService._defaultCaller == null)
                        throw new Error("Default service caller not set");

                    return ServiceCallerService._defaultCaller;
                };

                ServiceCallerService.SetDefaultCaller = function (value) {
                    ServiceCallerService._defaultCaller = value;
                };
                ServiceCallerService._defaultCaller = null;
                return ServiceCallerService;
            })();
            Client.ServiceCallerService = ServiceCallerService;
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
