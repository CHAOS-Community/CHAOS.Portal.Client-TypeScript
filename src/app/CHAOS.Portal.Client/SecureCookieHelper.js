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