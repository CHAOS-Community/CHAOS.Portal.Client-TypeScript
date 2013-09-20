var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        /// <reference path="Data.ts"/>
        (function (Client) {
            var PortalClient = (function () {
                function PortalClient(servicePath, clientGuid) {
                    if (typeof clientGuid === "undefined") { clientGuid = null; }
                    this._authenticationType = null;
                    if (typeof servicePath === "undefined")
                        throw "Parameter servicePath must be set";

                    if (servicePath.substr(servicePath.length - 1, 1) != "/")
                        servicePath += "/";

                    this._servicePath = servicePath;
                    this.ClientGuid = clientGuid;

                    this._sessionAcquired = new Event(this);
                    this._sessionAuthenticated = new Event(this);
                }
                PortalClient.GetClientVersion = function () {
                    return "2.6.9";
                };
                PortalClient.GetProtocolVersion = function () {
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

                PortalClient.prototype.CallService = function (path, method, parameters, requiresSession) {
                    if (typeof method === "undefined") { method = Client.HttpMethod.Get; }
                    if (typeof parameters === "undefined") { parameters = null; }
                    if (typeof requiresSession === "undefined") { requiresSession = true; }
                    if (requiresSession)
                        parameters = this.AddSessionToParameters(parameters);

                    return new CallState().Call(this.GetPathToExtension(path), method, parameters);
                };

                PortalClient.prototype.GetServiceCallUri = function (path, parameters, requiresSession, format) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    if (typeof requiresSession === "undefined") { requiresSession = true; }
                    if (typeof format === "undefined") { format = "json2"; }
                    if (requiresSession)
                        parameters = this.AddSessionToParameters(parameters);

                    return this.GetPathToExtension(path) + "?" + ServiceCall.CreateDataStringWithPortalParameters(parameters, format);
                };

                PortalClient.prototype.GetPathToExtension = function (path) {
                    return this.GetServicePath() + "v" + PortalClient.GetProtocolVersion() + "/" + path;
                };

                PortalClient.prototype.AddSessionToParameters = function (parameters) {
                    if (parameters == null)
                        parameters = {};

                    if (!this.HasSession())
                        throw "Session not acquired";

                    parameters["sessionGUID"] = this.GetCurrentSession().Guid;

                    return parameters;
                };

                PortalClient.prototype.UpdateSession = function (session) {
                    var hadSession = this._currentSession != null;

                    this._currentSession = session;

                    if (!hadSession && session != null)
                        this._sessionAcquired.Raise(session);
                };

                PortalClient.prototype.SetSessionAuthenticated = function (type, userGuid, sessionDateModified) {
                    this._authenticationType = type;

                    if (type != null) {
                        if (userGuid != null)
                            this._currentSession.UserGuid = userGuid;
                        if (sessionDateModified != null)
                            this._currentSession.DateModified = sessionDateModified;

                        this._sessionAuthenticated.Raise(type);
                    }
                };
                return PortalClient;
            })();
            Client.PortalClient = PortalClient;

            var CallState = (function () {
                function CallState() {
                }
                CallState.prototype.Call = function (path, method, parameters) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    var _this = this;
                    this._completed = new Event(this);
                    this._call = new ServiceCall();

                    this._call.Call(function (response) {
                        return _this._completed.Raise(response);
                    }, path, method, parameters);

                    return this;
                };

                CallState.prototype.WithCallback = function (callback, context) {
                    if (typeof context === "undefined") { context = null; }
                    if (context == null)
                        this._completed.Add(callback);
else
                        this._completed.Add(function (response) {
                            return callback.call(context, response);
                        });

                    return this;
                };

                CallState.prototype.WithCallbackAndToken = function (callback, token, context) {
                    if (typeof context === "undefined") { context = null; }
                    if (context == null)
                        this._completed.Add(function (response) {
                            return callback(response, token);
                        });
else
                        this._completed.Add(function (response) {
                            return callback.call(context, response, token);
                        });

                    return this;
                };
                return CallState;
            })();

            var ServiceCall = (function () {
                function ServiceCall() {
                }
                ServiceCall.prototype.Call = function (callback, path, method, parameters) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    var _this = this;
                    var data = ServiceCall.CreateDataStringWithPortalParameters(parameters);

                    if (method == Client.HttpMethod.Get) {
                        path += "?" + data;
                        data = null;
                    }

                    this._request = window["XMLHttpRequest"] ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                    this._callback = callback;

                    if ("withCredentials" in this._request) {
                        if (callback != null)
                            this._request.onreadystatechange = function () {
                                return _this.RequestStateChange();
                            };

                        this._request.open(method == Client.HttpMethod.Get ? "Get" : "Post", path, true);

                        if (method == Client.HttpMethod.Post)
                            this._request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                        this._request.send(data);
                    } else if (window["XDomainRequest"]) {
                        this._request = new XDomainRequest();

                        if (callback != null) {
                            this._request.onload = function () {
                                return _this.ParseResponse(_this._request.responseText);
                            };
                            this._request.onerror = this._request.ontimeout = function () {
                                return _this.ReportError();
                            };
                        }

                        this._request.open(method == Client.HttpMethod.Get ? "Get" : "Post", path);
                        this._request.send(data);

                        if (callback != null && this._request.responseText != "")
                            setTimeout(function () {
                                return _this.ParseResponse(_this._request.responseText);
                            }, 1);
                    } else
                        throw "Browser does not supper AJAX requests";
                };

                ServiceCall.prototype.RequestStateChange = function () {
                    if (this._request.readyState != 4)
                        return;

                    if (this._request.status == 200)
                        this.ParseResponse(this._request.responseText);
else
                        this.ReportError();
                };

                ServiceCall.prototype.ParseResponse = function (responseText) {
                    var response = JSON && JSON.parse(responseText) || eval(responseText);

                    if (response.Error != null && response.Error.Fullname == null)
                        response.Error = null;

                    this._callback(response);
                };

                ServiceCall.prototype.ReportError = function () {
                    this._callback({ Header: null, Body: null, Error: { Fullname: "ServiceError", Message: "Service call failed", Stacktrace: null, InnerException: null } });
                };

                ServiceCall.CreateDataStringWithPortalParameters = function (parameters, format) {
                    if (typeof format === "undefined") { format = "json2"; }
                    if (parameters == null)
                        parameters = {};

                    parameters["format"] = format;
                    parameters["userHTTPStatusCodes"] = "False";

                    return ServiceCall.CreateDataString(parameters);
                };

                ServiceCall.CreateDataString = function (parameters) {
                    var result = "";
                    var first = true;
                    for (var key in parameters) {
                        if (parameters[key] == null || typeof parameters[key] === 'undefined')
                            continue;

                        result += (first ? "" : "&") + key + "=" + encodeURIComponent(parameters[key]);

                        if (first)
                            first = false;
                    }

                    return result;
                };
                return ServiceCall;
            })();

            var Event = (function () {
                function Event(sender) {
                    this.sender = sender;
                    this._handlers = [];
                    if (typeof sender === "undefined")
                        throw "Parameter sender must be set";

                    this._sender = sender;
                }
                Event.prototype.Add = function (handler) {
                    if (handler == undefined || handler == null)
                        throw "handler must be defined";

                    this._handlers.push(handler);
                };

                Event.prototype.Remove = function (handler) {
                    if (handler == undefined || handler == null)
                        throw "handler must be defined";

                    for (var i = 0; i < this._handlers.length; i++) {
                        if (this._handlers[i] === handler) {
                            this._handlers.splice(i, 1);
                            return;
                        }
                    }
                };

                Event.prototype.Raise = function (data) {
                    for (var i = 0; i < this._handlers.length; i++)
                        this._handlers[i].call(this._sender, data);
                };
                return Event;
            })();
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//# sourceMappingURL=PortalClient.js.map
