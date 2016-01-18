var CHAOS;
(function (CHAOS) {
    var Portal;
    (function (Portal) {
        var Client;
        (function (Client) {
            (function (HttpMethod) {
                HttpMethod[HttpMethod["Get"] = 0] = "Get";
                HttpMethod[HttpMethod["Post"] = 1] = "Post";
            })(Client.HttpMethod || (Client.HttpMethod = {}));
            var HttpMethod = Client.HttpMethod;
        })(Client = Portal.Client || (Portal.Client = {}));
    })(Portal = CHAOS.Portal || (CHAOS.Portal = {}));
})(CHAOS || (CHAOS = {}));
