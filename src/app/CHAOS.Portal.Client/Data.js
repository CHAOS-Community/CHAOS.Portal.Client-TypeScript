var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var HttpMethod = (function () {
                function HttpMethod() {
                }
                HttpMethod.Get = function () {
                    return "GET";
                };
                HttpMethod.Post = function () {
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
