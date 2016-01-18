var CHAOS;
(function (CHAOS) {
    var Portal;
    (function (Portal) {
        var Client;
        (function (Client) {
            var Session = (function () {
                function Session() {
                }
                Session.Create = function (serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Session/Create", Client.HttpMethod.Get, null, false).WithCallback(function (response) {
                        if (response.Error == null)
                            serviceCaller.UpdateSession(response.Body.Results[0]);
                    });
                };
                Session.Get = function (serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Session/Get").WithCallback(function (response) {
                        if (response.Error == null)
                            serviceCaller.UpdateSession(response.Body.Results[0]);
                    });
                };
                Session.Update = function (serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Session/Update").WithCallback(function (response) {
                        if (response.Error == null)
                            serviceCaller.UpdateSession(response.Body.Results[0]);
                    });
                };
                Session.Delete = function (serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Session/Delete").WithCallback(function (response) {
                        if (response.Error == null) {
                            serviceCaller.SetSessionAuthenticated(null, null, null);
                            serviceCaller.UpdateSession(null);
                        }
                    });
                };
                return Session;
            })();
            Client.Session = Session;
            var User = (function () {
                function User() {
                }
                User.Create = function (guid, email, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("User/Create", Client.HttpMethod.Post, { guid: guid, email: email });
                };
                User.Update = function (guid, email, permissons, serviceCaller) {
                    if (permissons === void 0) { permissons = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("User/Update", Client.HttpMethod.Post, { guid: guid, email: email, permissons: permissons }, true);
                };
                User.Delete = function (guid, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("User/Delete", Client.HttpMethod.Get, { guid: guid });
                };
                User.Get = function (guid, groupGuid, serviceCaller) {
                    if (guid === void 0) { guid = null; }
                    if (groupGuid === void 0) { groupGuid = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("User/Get", Client.HttpMethod.Get, { guid: guid, groupGuid: groupGuid });
                };
                User.GetCurrent = function (serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("User/GetCurrent");
                };
                return User;
            })();
            Client.User = User;
            var Group = (function () {
                function Group() {
                }
                Group.Get = function (guid, userGuid, serviceCaller) {
                    if (guid === void 0) { guid = null; }
                    if (userGuid === void 0) { userGuid = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Group/Get", Client.HttpMethod.Get, { guid: guid, userGuid: userGuid });
                };
                Group.Create = function (name, systemPermission, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Group/Create", Client.HttpMethod.Get, { name: name, systemPermission: systemPermission });
                };
                Group.Update = function (guid, newName, newSystemPermission, serviceCaller) {
                    if (newSystemPermission === void 0) { newSystemPermission = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Group/Update", Client.HttpMethod.Get, { guid: guid, newName: newName, newSystemPermission: newSystemPermission });
                };
                Group.Delete = function (guid, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Group/Delete", Client.HttpMethod.Get, { guid: guid });
                };
                Group.AddUser = function (guid, userGuid, permissions, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Group/AddUser", Client.HttpMethod.Get, { guid: guid, userGuid: userGuid, permissions: permissions });
                };
                Group.RemoveUser = function (guid, userGuid, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Group/RemoveUser", Client.HttpMethod.Get, { guid: guid, userGuid: userGuid });
                };
                Group.UpdateUserPermissions = function (guid, userGuid, permissions, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Group/UpdateUserPermissions", Client.HttpMethod.Get, { guid: guid, userGuid: userGuid, permissions: permissions });
                };
                return Group;
            })();
            Client.Group = Group;
            var View = (function () {
                function View() {
                }
                View.Get = function (view, query, sort, filter, pageIndex, pageSize, serviceCaller) {
                    if (query === void 0) { query = null; }
                    if (sort === void 0) { sort = null; }
                    if (filter === void 0) { filter = null; }
                    if (pageIndex === void 0) { pageIndex = 0; }
                    if (pageSize === void 0) { pageSize = 10; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("View/Get", Client.HttpMethod.Get, { view: view, query: query, sort: sort, filter: filter, pageIndex: pageIndex, pageSize: pageSize });
                };
                View.List = function (serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("View/List");
                };
                return View;
            })();
            Client.View = View;
            var ClientSettings = (function () {
                function ClientSettings() {
                }
                ClientSettings.Get = function (guid, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("ClientSettings/Get", Client.HttpMethod.Get, { guid: guid });
                };
                ClientSettings.Set = function (guid, name, settings, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("ClientSettings/Set", Client.HttpMethod.Post, { guid: guid, name: name, settings: settings });
                };
                return ClientSettings;
            })();
            Client.ClientSettings = ClientSettings;
            function Initialize(servicePath, clientGUID, autoCreateSession) {
                if (clientGUID === void 0) { clientGUID = null; }
                if (autoCreateSession === void 0) { autoCreateSession = true; }
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
        })(Client = Portal.Client || (Portal.Client = {}));
    })(Portal = CHAOS.Portal || (CHAOS.Portal = {}));
})(CHAOS || (CHAOS = {}));
