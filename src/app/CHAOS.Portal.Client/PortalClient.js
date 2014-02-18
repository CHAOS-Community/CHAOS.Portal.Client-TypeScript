var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var PortalClient = (function () {
                function PortalClient(servicePath, clientGuid) {
                    if (typeof clientGuid === "undefined") { clientGuid = null; }
                    this._authenticationType = null;
                    if (servicePath == null || servicePath == "" || typeof servicePath != "string")
                        throw new Error("Parameter servicePath must be set to a valid path");

                    if (servicePath.substr(servicePath.length - 1, 1) != "/")
                        servicePath += "/";

                    this._servicePath = servicePath;
                    this.ClientGuid = clientGuid;

                    this._sessionAcquired = new Event(this);
                    this._sessionAuthenticated = new Event(this);
                }
                PortalClient.GetClientVersion = function () {
                    return "2.9.2";
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
                    if (typeof method === "undefined") { method = 0 /* Get */; }
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
                        throw new Error("Session not acquired");

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
                    this._call = null;
                    this._completed = new Event(this);
                    this._progressChanged = new Event(this);
                }
                CallState.prototype.TransferProgressChanged = function () {
                    return this._progressChanged;
                };

                CallState.prototype.Call = function (path, method, parameters) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    var _this = this;
                    if (this._call != null)
                        throw new Error("Call can not be called multiple times");

                    this._call = new ServiceCall();

                    this._call.Call(function (response) {
                        return _this._completed.Raise(response);
                    }, function (progress) {
                        return _this._progressChanged.Raise(progress);
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
                ServiceCall.prototype.Call = function (completeCallback, progressCallback, path, method, parameters) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    this._completeCallback = completeCallback;
                    this._progressCallback = progressCallback;

                    if (window["FormData"])
                        this.CallWithXMLHttpRequest2Browser(path, method, parameters);
                    else if (window["XMLHttpRequest"])
                        this.CallWithXMLHttpRequestBrowser(path, method, parameters);
                    else if (window["XDomainRequest"] || window["ActiveXObject"])
                        this.CallWithOldIEBrowser(path, method, parameters);
                    else
                        throw new Error("Browser does not supper AJAX requests");
                };

                ServiceCall.prototype.CallWithXMLHttpRequest2Browser = function (path, method, parameters) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    var _this = this;
                    this._request = new XMLHttpRequest();
                    var data = null;

                    if (method == 0 /* Get */)
                        path += "?" + ServiceCall.CreateDataStringWithPortalParameters(parameters);
                    else {
                        parameters = ServiceCall.AddPortalParameters(ServiceCall.ConvertDatesToCorrectFormat(ServiceCall.RemoveNullParameters(parameters)));
                        data = new FormData();
                        for (var key in parameters)
                            data.append(key, parameters[key]);
                    }

                    this._request.onreadystatechange = function () {
                        return _this.RequestStateChange();
                    };
                    this._request.upload.onprogress = function (event) {
                        return _this.ReportProgressUpdate(event.loaded, event.total, event.lengthComputable);
                    };

                    this._request.open(method == 0 /* Get */ ? "GET" : "POST", path, true);
                    this._request.send(data);
                };

                ServiceCall.prototype.CallWithXMLHttpRequestBrowser = function (path, method, parameters) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    var _this = this;
                    this._request = new XMLHttpRequest();
                    var data = ServiceCall.CreateDataStringWithPortalParameters(parameters);

                    if (method == 0 /* Get */) {
                        path += "?" + data;
                        data = null;
                    }

                    this._request.onreadystatechange = function () {
                        return _this.RequestStateChange();
                    };

                    this._request.open(method == 0 /* Get */ ? "GET" : "POST", path, true);

                    if (method == 1 /* Post */)
                        this._request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    this._request.send(data);
                };

                ServiceCall.prototype.CallWithOldIEBrowser = function (path, method, parameters) {
                    if (typeof parameters === "undefined") { parameters = null; }
                    var _this = this;
                    this._request = window["XDomainRequest"] ? new XDomainRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                    var data = ServiceCall.CreateDataStringWithPortalParameters(parameters);

                    if (method == 0 /* Get */) {
                        path += "?" + data;
                        data = null;
                    }

                    this._request.onload = function () {
                        return _this.ReportCompleted(_this._request.responseText);
                    };
                    this._request.onerror = this._request.ontimeout = function () {
                        return _this.ReportError();
                    };

                    this._request.open(method == 0 /* Get */ ? "Get" : "Post", path);
                    this._request.send(data);

                    if (this._request.responseText != "")
                        setTimeout(function () {
                            return _this.ReportCompleted(_this._request.responseText);
                        }, 1); // Delay cached response so callbacks can be attached
                };

                ServiceCall.prototype.RequestStateChange = function () {
                    if (this._request.readyState != 4)
                        return;

                    if (this._request.status == 200)
                        this.ReportCompleted(this._request.responseText);
                    else
                        this.ReportError();
                };

                ServiceCall.prototype.ReportCompleted = function (responseText) {
                    if (this._completeCallback == null)
                        return;

                    var response = JSON && JSON.parse(responseText) || eval(responseText);

                    if (response.Error != null && response.Error.Fullname == null)
                        response.Error = null;

                    this._completeCallback(response);
                };

                ServiceCall.prototype.ReportProgressUpdate = function (bytesTransfered, totalBytes, totalBytesIsKnown) {
                    if (this._progressCallback == null)
                        return;

                    this._progressCallback({ BytesTransfered: bytesTransfered, TotalBytes: totalBytes, TotalBytesIsKnown: totalBytesIsKnown });
                };

                ServiceCall.prototype.ReportError = function () {
                    if (this._completeCallback == null)
                        return;

                    this._completeCallback({ Header: null, Body: null, Error: { Fullname: "ServiceError", Message: "Service call failed", Stacktrace: null, InnerException: null } });
                };

                ServiceCall.CreateDataStringWithPortalParameters = function (parameters, format) {
                    if (typeof format === "undefined") { format = "json2"; }
                    return ServiceCall.CreateDataString(ServiceCall.AddPortalParameters(parameters, format));
                };

                ServiceCall.CreateDataString = function (parameters) {
                    parameters = ServiceCall.ConvertDatesToCorrectFormat(ServiceCall.RemoveNullParameters(parameters));

                    var result = "";
                    var first = true;
                    for (var key in parameters) {
                        result += (first ? "" : "&") + key + "=" + encodeURIComponent(parameters[key]);

                        if (first)
                            first = false;
                    }

                    return result;
                };

                ServiceCall.ConvertDate = function (date) {
                    return ServiceCall.ToTwoDigits(date.getUTCDate()) + "-" + ServiceCall.ToTwoDigits(date.getUTCMonth() + 1) + "-" + date.getUTCFullYear() + " " + ServiceCall.ToTwoDigits(date.getUTCHours()) + ":" + ServiceCall.ToTwoDigits(date.getUTCMinutes()) + ":" + ServiceCall.ToTwoDigits(date.getUTCSeconds());
                    //return date.getUTCFullYear() + "-" + ServiceCall.ToTwoDigits(date.getUTCMonth() + 1) + "-" + ServiceCall.ToTwoDigits(date.getUTCDate()) + "T" + ServiceCall.ToTwoDigits(date.getUTCHours()) + ":" + ServiceCall.ToTwoDigits(date.getUTCMinutes()) + ":" + ServiceCall.ToTwoDigits(date.getUTCSeconds()) + "Z";
                };

                ServiceCall.AddPortalParameters = function (parameters, format) {
                    if (typeof format === "undefined") { format = "json2"; }
                    if (parameters == null)
                        parameters = {};

                    parameters["format"] = format;
                    parameters["userHTTPStatusCodes"] = "False";

                    return parameters;
                };

                ServiceCall.ConvertDatesToCorrectFormat = function (parameters) {
                    var value;

                    for (var key in parameters) {
                        value = parameters[key];
                        if (CHAOS.Portal.Client.Object.prototype.toString.call(value) === '[object Date]')
                            parameters[key] = ServiceCall.ConvertDate(value);
                    }

                    return parameters;
                };

                ServiceCall.RemoveNullParameters = function (parameters) {
                    var value;

                    for (var key in parameters) {
                        value = parameters[key];
                        if (value == null)
                            delete parameters[key];
                    }

                    return parameters;
                };

                ServiceCall.ToTwoDigits = function (value) {
                    return value < 10 ? "0" + value : value.toString();
                };
                return ServiceCall;
            })();

            var Event = (function () {
                function Event(sender) {
                    this.sender = sender;
                    this._handlers = [];
                    if (typeof sender === "undefined")
                        throw new Error("Parameter sender must be set");

                    this._sender = sender;
                }
                Event.prototype.Add = function (handler) {
                    if (handler == null)
                        throw new Error("handler must be defined");

                    this._handlers.push(handler);
                };

                Event.prototype.Remove = function (handler) {
                    if (handler == null)
                        throw new Error("handler must be defined");

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
