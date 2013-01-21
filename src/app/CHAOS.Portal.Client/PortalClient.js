var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var PortalClient = (function () {
                function PortalClient(servicePath, clientGUID) {
                    if (typeof clientGUID === "undefined") { clientGUID = null; }
                    this._authenticationType = null;
                    if(typeof servicePath === "undefined") {
                        throw "Parameter servicePath must be set";
                    }
                    if(servicePath.substr(-1) != "/") {
                        servicePath += "/";
                    }
                    this._servicePath = servicePath;
                    this.ClientGUID = clientGUID;
                    this._sessionAcquired = new Event(this);
                    this._sessionAuthenticated = new Event(this);
                }
                PortalClient.GetClientVersion = function GetClientVersion() {
                    return "2.0.0";
                }
                PortalClient.GetProtocolVersion = function GetProtocolVersion() {
                    return 6;
                }
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
                PortalClient.prototype.CallService = function (callback, path, httpMethod, parameters, requiresSession) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    if (typeof requiresSession === "undefined") { requiresSession = true; }
                    if(parameters == null) {
                        parameters = {
                        };
                    }
                    if(requiresSession) {
                        if(!this.HasSession()) {
                            throw "Session not acquired";
                        }
                        parameters["sessionGUID"] = this.GetCurrentSession().GUID;
                    }
                    new ServiceCall().Call(callback, this.GetServicePath() + "latest/" + path, httpMethod, parameters);
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
            var ServiceCall = (function () {
                function ServiceCall() { }
                ServiceCall.prototype.Call = function (callback, path, httpMethod, parameters) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    var _this = this;
                    if(parameters == null) {
                        parameters = {
                        };
                    }
                    parameters["format"] = "json";
                    parameters["userHTTPStatusCodes"] = "False";
                    this._request = window["XMLHttpRequest"] ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                    this._callback = callback;
                    if(callback != null) {
                        this._request.onreadystatechange = function () {
                            return _this.RequestStateChange();
                        };
                    }
                    var data = this.CreateQueryString(parameters);
                    if(httpMethod == Client.HttpMethod.Get()) {
                        path += "?" + data;
                        data = null;
                    }
                    this._request.open(httpMethod, path, true);
                    if(httpMethod == Client.HttpMethod.Post()) {
                        this._request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    }
                    this._request.send(data);
                };
                ServiceCall.prototype.RequestStateChange = function () {
                    if(this._request.readyState != 4) {
                        return;
                    }
                    if(this._request.status == 200) {
                        var response = JSON && JSON.parse(this._request.responseText) || eval(this._request.responseText);
                        if(response.Error != null && response.Error.Fullname == null) {
                            response.Error = null;
                        }
                        this._callback(response);
                    } else {
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
                    }
                };
                ServiceCall.prototype.CreateQueryString = function (parameters) {
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
//@ sourceMappingURL=PortalClient.js.map
