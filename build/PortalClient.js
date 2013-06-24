var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var HttpMethod = (function () {
                function HttpMethod() { }
                HttpMethod.Get = function Get() {
                    return "GET";
                };
                HttpMethod.Post = function Post() {
                    return "POST";
                };
                return HttpMethod;
            })();
            Client.HttpMethod = HttpMethod;            
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var PortalClient = (function () {
                function PortalClient(servicePath, clientGuid) {
                    if (typeof clientGuid === "undefined") { clientGuid = null; }
                    this._authenticationType = null;
                    if(typeof servicePath === "undefined") {
                        throw "Parameter servicePath must be set";
                    }
                    if(servicePath.substr(servicePath.length - 1, 1) != "/") {
                        servicePath += "/";
                    }
                    this._servicePath = servicePath;
                    this.ClientGuid = clientGuid;
                    this._sessionAcquired = new Event(this);
                    this._sessionAuthenticated = new Event(this);
                }
                PortalClient.GetClientVersion = function GetClientVersion() {
                    return "2.4.2";
                };
                PortalClient.GetProtocolVersion = function GetProtocolVersion() {
                    return 6;
                };
                PortalClient.prototype.GetServicePath = function () {
                    return this._servicePath;
                };
                PortalClient.prototype.GetCurrentSession = function () {
                    return this._currentSession;
                };
                PortalClient.prototype.HasSession = function () {
                    return this.GetCurrentSession() != null;
                };
                PortalClient.prototype.IsAuthenticated = function () {
                    return this._authenticationType != null;
                };
                PortalClient.prototype.SessionAcquired = function () {
                    return this._sessionAcquired;
                };
                PortalClient.prototype.SessionAuthenticated = function () {
                    return this._sessionAuthenticated;
                };
                PortalClient.prototype.CallService = function (path, httpMethod, parameters, requiresSession) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    if (typeof requiresSession === "undefined") { requiresSession = true; }
                    if(requiresSession) {
                        parameters = this.AddSessionToParameters(parameters);
                    }
                    return new CallState().Call(this.GetPathToExtension(path), httpMethod, parameters);
                };
                PortalClient.prototype.GetServiceCallUri = function (path, parameters, requiresSession, format) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    if (typeof requiresSession === "undefined") { requiresSession = true; }
                    if (typeof format === "undefined") { format = "json"; }
                    if(requiresSession) {
                        parameters = this.AddSessionToParameters(parameters);
                    }
                    return this.GetPathToExtension(path) + "?" + ServiceCall.CreateDataStringWithPortalParameters(parameters, format);
                };
                PortalClient.prototype.GetPathToExtension = function (path) {
                    return this.GetServicePath() + "v" + PortalClient.GetProtocolVersion() + "/" + path;
                };
                PortalClient.prototype.AddSessionToParameters = function (parameters) {
                    if(parameters == null) {
                        parameters = {
                        };
                    }
                    if(!this.HasSession()) {
                        throw "Session not acquired";
                    }
                    parameters["sessionGUID"] = this.GetCurrentSession().Guid;
                    return parameters;
                };
                PortalClient.prototype.UpdateSession = function (session) {
                    this._currentSession = session;
                    this._sessionAcquired.Raise(session);
                };
                PortalClient.prototype.SetSessionAuthenticated = function (type) {
                    this._authenticationType = type;
                    this._sessionAuthenticated.Raise(type);
                };
                return PortalClient;
            })();
            Client.PortalClient = PortalClient;            
            var CallState = (function () {
                function CallState() { }
                CallState.prototype.Call = function (path, httpMethod, parameters) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    var _this = this;
                    this._completed = new Event(this);
                    this._call = new ServiceCall();
                    this._call.Call(function (response) {
                        return _this._completed.Raise(response);
                    }, path, httpMethod, parameters);
                    return this;
                };
                CallState.prototype.WithCallback = function (callback, context) {
                    if (typeof context === "undefined") { context = null; }
                    if(context == null) {
                        this._completed.Add(callback);
                    } else {
                        this._completed.Add(function (response) {
                            return callback.call(context, response);
                        });
                    }
                    return this;
                };
                CallState.prototype.WithCallbackAndToken = function (callback, token, context) {
                    if (typeof context === "undefined") { context = null; }
                    if(context == null) {
                        this._completed.Add(function (response) {
                            return callback(response, token);
                        });
                    } else {
                        this._completed.Add(function (response) {
                            return callback.call(context, response, token);
                        });
                    }
                    return this;
                };
                return CallState;
            })();            
            var ServiceCall = (function () {
                function ServiceCall() { }
                ServiceCall.prototype.Call = function (callback, path, httpMethod, parameters) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    var _this = this;
                    var data = ServiceCall.CreateDataStringWithPortalParameters(parameters);
                    if(httpMethod == Client.HttpMethod.Get()) {
                        path += "?" + data;
                        data = null;
                    }
                    this._request = window["XMLHttpRequest"] ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                    this._callback = callback;
                    if("withCredentials" in this._request) {
                        if(callback != null) {
                            this._request.onreadystatechange = function () {
                                return _this.RequestStateChange();
                            };
                        }
                        this._request.open(httpMethod, path, true);
                        if(httpMethod == Client.HttpMethod.Post()) {
                            this._request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        }
                        this._request.send(data);
                    } else if(window["XDomainRequest"]) {
                        this._request = new XDomainRequest();
                        if(callback != null) {
                            this._request.onload = function () {
                                return _this.ParseResponse(_this._request.responseText);
                            };
                            this._request.onerror = this._request.ontimeout = function () {
                                return _this.ReportError();
                            };
                        }
                        this._request.open(httpMethod, path);
                        this._request.send(data);
                        if(callback != null && this._request.responseText != "") {
                            setTimeout(function () {
                                return _this.ParseResponse(_this._request.responseText);
                            }, 1);
                        }
                    } else {
                        throw "Browser does not supper AJAX requests";
                    }
                };
                ServiceCall.prototype.RequestStateChange = function () {
                    if(this._request.readyState != 4) {
                        return;
                    }
                    if(this._request.status == 200) {
                        this.ParseResponse(this._request.responseText);
                    } else {
                        this.ReportError();
                    }
                };
                ServiceCall.prototype.ParseResponse = function (response) {
                    var response = JSON && JSON.parse(this._request.responseText) || eval(this._request.responseText);
                    if(response.Error != null && response.Error.Fullname == null) {
                        response.Error = null;
                    }
                    this._callback(response);
                };
                ServiceCall.prototype.ReportError = function () {
                    this._callback({
                        Header: null,
                        Result: null,
                        Error: {
                            Fullname: "ServiceError",
                            Message: "Service call failed",
                            Stacktrace: null,
                            InnerException: null
                        }
                    });
                };
                ServiceCall.CreateDataStringWithPortalParameters = function CreateDataStringWithPortalParameters(parameters, format) {
                    if (typeof format === "undefined") { format = "json"; }
                    if(parameters == null) {
                        parameters = {
                        };
                    }
                    parameters["format"] = format;
                    parameters["userHTTPStatusCodes"] = "False";
                    return ServiceCall.CreateDataString(parameters);
                };
                ServiceCall.CreateDataString = function CreateDataString(parameters) {
                    var result = "";
                    var first = true;
                    for(var key in parameters) {
                        if(parameters[key] == null || typeof parameters[key] === 'undefined') {
                            continue;
                        }
                        result += (first ? "" : "&") + key + "=" + encodeURIComponent(parameters[key]);
                        if(first) {
                            first = false;
                        }
                    }
                    return result;
                };
                return ServiceCall;
            })();            
            var Event = (function () {
                function Event(sender) {
                    this.sender = sender;
                    this._handlers = [];
                    if(typeof sender === "undefined") {
                        throw "Parameter sender must be set";
                    }
                    this._sender = sender;
                }
                Event.prototype.Add = function (handler) {
                    if(handler == undefined || handler == null) {
                        throw "handler must be defined";
                    }
                    this._handlers.push(handler);
                };
                Event.prototype.Remove = function (handler) {
                    if(handler == undefined || handler == null) {
                        throw "handler must be defined";
                    }
                    for(var i = 0; i < this._handlers.length; i++) {
                        if(this._handlers[i] === handler) {
                            this._handlers.splice(i, 1);
                            return;
                        }
                    }
                };
                Event.prototype.Raise = function (data) {
                    for(var i = 0; i < this._handlers.length; i++) {
                        this._handlers[i].call(this._sender, data);
                    }
                };
                return Event;
            })();            
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
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
                User.Create = function Create(guid, email, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("User/Create", Client.HttpMethod.Post(), {
                        guid: guid,
                        email: email
                    }, true);
                };
                User.Update = function Update(guid, email, permissons, serviceCaller) {
                    if (typeof permissons === "undefined") { permissons = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("User/Update", Client.HttpMethod.Post(), {
                        guid: guid,
                        email: email,
                        permissons: permissons
                    }, true);
                };
                User.Delete = function Delete(guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("User/Delete", Client.HttpMethod.Get(), {
                        guid: guid
                    }, true);
                };
                User.Get = function Get(guid, groupGuid, serviceCaller) {
                    if (typeof guid === "undefined") { guid = null; }
                    if (typeof groupGuid === "undefined") { groupGuid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("User/Get", Client.HttpMethod.Get(), {
                        guid: guid,
                        groupGuid: groupGuid
                    }, true);
                };
                User.GetCurrent = function GetCurrent(serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("User/GetCurrent", Client.HttpMethod.Get(), null, true);
                };
                return User;
            })();
            Client.User = User;            
            var Group = (function () {
                function Group() { }
                Group.Get = function Get(guid, userGuid, serviceCaller) {
                    if (typeof guid === "undefined") { guid = null; }
                    if (typeof userGuid === "undefined") { userGuid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Group/Get", Client.HttpMethod.Get(), {
                        guid: guid,
                        userGuid: userGuid
                    }, true);
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
                Group.AddUser = function AddUser(guid, userGuid, permissions, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Group/AddUser", Client.HttpMethod.Get(), {
                        guid: guid,
                        userGuid: userGuid,
                        permissions: permissions
                    }, true);
                };
                Group.RemoveUser = function RemoveUser(guid, userGuid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Group/RemoveUser", Client.HttpMethod.Get(), {
                        guid: guid,
                        userGuid: userGuid
                    }, true);
                };
                Group.UpdateUserPermissions = function UpdateUserPermissions(guid, userGuid, permissions, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Group/UpdateUserPermissions", Client.HttpMethod.Get(), {
                        guid: guid,
                        userGuid: userGuid,
                        permissions: permissions
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
            var ClientSettings = (function () {
                function ClientSettings() { }
                ClientSettings.Get = function Get(guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("ClientSettings/Get", Client.HttpMethod.Get(), {
                        guid: guid
                    }, true);
                };
                ClientSettings.Set = function Set(guid, name, settings, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("ClientSettings/Set", Client.HttpMethod.Post(), {
                        guid: guid,
                        name: name,
                        settings: settings
                    }, true);
                };
                return ClientSettings;
            })();
            Client.ClientSettings = ClientSettings;            
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
var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var MetadataSchema = (function () {
                function MetadataSchema() { }
                MetadataSchema.Get = function Get(metadataSchemaGUID, serviceCaller) {
                    if (typeof metadataSchemaGUID === "undefined") { metadataSchemaGUID = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("MetadataSchema/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        metadataSchemaGUID: metadataSchemaGUID
                    }, true);
                };
                MetadataSchema.Create = function Create(name, schemaXml, guid, serviceCaller) {
                    if (typeof guid === "undefined") { guid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("MetadataSchema/Create", CHAOS.Portal.Client.HttpMethod.Post(), {
                        name: name,
                        schemaXml: schemaXml,
                        guid: guid
                    }, true);
                };
                MetadataSchema.Update = function Update(name, schemaXml, guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("MetadataSchema/Update", CHAOS.Portal.Client.HttpMethod.Post(), {
                        name: name,
                        schemaXml: schemaXml,
                        guid: guid
                    }, true);
                };
                MetadataSchema.Delete = function Delete(guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("MetadataSchema/Delete", CHAOS.Portal.Client.HttpMethod.Get(), {
                        guid: guid
                    }, true);
                };
                MetadataSchema.HasPermissionToMetadataSchema = function HasPermissionToMetadataSchema(guid, MetadataSchemaPermission, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("MetadataSchema/HasPermissionToMetadataSchema", CHAOS.Portal.Client.HttpMethod.Get(), {
                        guid: guid,
                        MetadataSchemaPermission: MetadataSchemaPermission
                    }, true);
                };
                return MetadataSchema;
            })();
            Client.MetadataSchema = MetadataSchema;            
            var Folder = (function () {
                function Folder() { }
                Folder.Get = function Get(id, folderTypeID, parentID, serviceCaller) {
                    if (typeof id === "undefined") { id = null; }
                    if (typeof folderTypeID === "undefined") { folderTypeID = null; }
                    if (typeof parentID === "undefined") { parentID = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Folder/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        id: id,
                        folderTypeID: folderTypeID,
                        parentID: parentID
                    }, true);
                };
                return Folder;
            })();
            Client.Folder = Folder;            
            var FolderType = (function () {
                function FolderType() { }
                FolderType.Get = function Get(name, serviceCaller) {
                    if (typeof name === "undefined") { name = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("FolderType/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        name: name
                    }, true);
                };
                return FolderType;
            })();
            Client.FolderType = FolderType;            
            var Format = (function () {
                function Format() { }
                Format.Get = function Get(name, serviceCaller) {
                    if (typeof name === "undefined") { name = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Format/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        name: name
                    }, true);
                };
                return Format;
            })();
            Client.Format = Format;            
            var FormatType = (function () {
                function FormatType() { }
                FormatType.Get = function Get(name, serviceCaller) {
                    if (typeof name === "undefined") { name = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("FormatType/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        name: name
                    }, true);
                };
                return FormatType;
            })();
            Client.FormatType = FormatType;            
            var Language = (function () {
                function Language() { }
                Language.Get = function Get(name, languageCode, serviceCaller) {
                    if (typeof name === "undefined") { name = null; }
                    if (typeof languageCode === "undefined") { languageCode = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Language/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        name: name,
                        languageCode: languageCode
                    }, true);
                };
                return Language;
            })();
            Client.Language = Language;            
            var Object = (function () {
                function Object() { }
                Object.Create = function Create(guid, objectTypeID, folderID, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Object/Create", CHAOS.Portal.Client.HttpMethod.Post(), {
                        guid: guid,
                        objectTypeID: objectTypeID,
                        folderID: folderID
                    }, true);
                };
                Object.Get = function Get(objectGuids, includeMetadata, includeFiles, includeObjectRelations, includeFolders, includeAccessPoints, serviceCaller) {
                    if (typeof includeMetadata === "undefined") { includeMetadata = false; }
                    if (typeof includeFiles === "undefined") { includeFiles = false; }
                    if (typeof includeObjectRelations === "undefined") { includeObjectRelations = false; }
                    if (typeof includeFolders === "undefined") { includeFolders = false; }
                    if (typeof includeAccessPoints === "undefined") { includeAccessPoints = false; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Object/Get", CHAOS.Portal.Client.HttpMethod.Post(), {
                        objectGuids: objectGuids.join(),
                        includeMetadata: includeMetadata,
                        includeFiles: includeFiles,
                        includeObjectRelations: includeObjectRelations,
                        includeFolders: includeFolders,
                        includeAccessPoints: includeAccessPoints
                    }, true);
                };
                Object.SetPublishSettings = function SetPublishSettings(objectGUID, accessPointGUID, startDate, endDate, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Object/SetPublishSettings", CHAOS.Portal.Client.HttpMethod.Post(), {
                        objectGUID: objectGUID,
                        accessPointGUID: accessPointGUID,
                        startDate: startDate,
                        endDate: endDate
                    }, true);
                };
                return Object;
            })();
            Client.Object = Object;            
            var ObjectRelationType = (function () {
                function ObjectRelationType() { }
                ObjectRelationType.Get = function Get(value, serviceCaller) {
                    if (typeof value === "undefined") { value = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("ObjectRelationType/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        value: value
                    }, true);
                };
                return ObjectRelationType;
            })();
            Client.ObjectRelationType = ObjectRelationType;            
            var Metadata = (function () {
                function Metadata() { }
                Metadata.Set = function Set(objectGUID, metadataSchemaGUID, languageCode, revisionID, metadataXML, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Metadata/Set", CHAOS.Portal.Client.HttpMethod.Post(), {
                        objectGUID: objectGUID,
                        metadataSchemaGUID: metadataSchemaGUID,
                        languageCode: languageCode,
                        revisionID: revisionID,
                        metadataXML: metadataXML
                    }, true);
                };
                return Metadata;
            })();
            Client.Metadata = Metadata;            
            var ObjectType = (function () {
                function ObjectType() { }
                ObjectType.Get = function Get(serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("ObjectType/Get", CHAOS.Portal.Client.HttpMethod.Get(), null, true);
                };
                ObjectType.Set = function Set(name, id, serviceCaller) {
                    if (typeof id === "undefined") { id = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("ObjectType/Set", CHAOS.Portal.Client.HttpMethod.Get(), {
                        id: id,
                        name: name
                    }, true);
                };
                ObjectType.Delete = function Delete(id, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("ObjectType/Delete", CHAOS.Portal.Client.HttpMethod.Get(), {
                        id: id
                    }, true);
                };
                return ObjectType;
            })();
            Client.ObjectType = ObjectType;            
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var SecureCookieHelper = (function () {
                function SecureCookieHelper() { }
                SecureCookieHelper.COOKIE_LIFE_TIME_DAYS = 90;
                SecureCookieHelper.DoesCookieExist = function DoesCookieExist() {
                    return this.GetCookie() != null;
                };
                SecureCookieHelper.Login = function Login(callback, serviceCaller) {
                    if (typeof callback === "undefined") { callback = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    var _this = this;
                    var login = this.GetCookie();
                    if(login == null) {
                        if(callback != null) {
                            callback(false);
                        }
                        return;
                    }
                    Client.SecureCookie.Login(login.Guid, login.PasswordGuid, serviceCaller).WithCallback(function (response) {
                        if(response.Error == null) {
                            _this.SetCookie(response.Result.Results[0].Guid, response.Result.Results[0].PasswordGuid, _this.COOKIE_LIFE_TIME_DAYS);
                            if(callback != null) {
                                callback(true);
                            }
                        } else if(callback != null) {
                            callback(false);
                        }
                    });
                };
                SecureCookieHelper.Create = function Create(serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    var _this = this;
                    Client.SecureCookie.Create(serviceCaller).WithCallback(function (response) {
                        if(response.Error == null) {
                            _this.SetCookie(response.Result.Results[0].Guid, response.Result.Results[0].PasswordGuid, _this.COOKIE_LIFE_TIME_DAYS);
                        }
                    });
                };
                SecureCookieHelper.Clear = function Clear() {
                    this.SetCookie("", "", -2);
                };
                SecureCookieHelper.GetCookie = function GetCookie() {
                    var cookie = document.cookie;
                    if(cookie == undefined || cookie == null) {
                        return null;
                    }
                    var guidRegEx = /SecureCookieGuid\=(.+?)(?:;|$)/;
                    var passwordRegex = /SecureCookiePasswordGuid\=(.+?)(?:;|$)/;
                    var result = {
                        Guid: "",
                        PasswordGuid: ""
                    };
                    var match = guidRegEx.exec(cookie);
                    if(match == null) {
                        return null;
                    }
                    result.Guid = match[1];
                    match = passwordRegex.exec(cookie);
                    if(match == null) {
                        return null;
                    }
                    result.PasswordGuid = match[1];
                    return result;
                };
                SecureCookieHelper.SetCookie = function SetCookie(guid, passwordGuid, expireInDays) {
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + expireInDays);
                    document.cookie = "SecureCookieGuid=" + (guid == null ? "" : guid) + "; expires=" + expireDate.toUTCString() + ";";
                    document.cookie = "SecureCookiePasswordGuid=" + (passwordGuid == null ? "" : passwordGuid) + "; expires=" + expireDate.toUTCString() + ";";
                };
                return SecureCookieHelper;
            })();
            Client.SecureCookieHelper = SecureCookieHelper;            
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
