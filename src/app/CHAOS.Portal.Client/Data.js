var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            (function (HttpMethod) {
                HttpMethod[HttpMethod["Get"] = 0] = "Get";
                HttpMethod[HttpMethod["Post"] = 1] = "Post";
            })(Client.HttpMethod || (Client.HttpMethod = {}));
            var HttpMethod = Client.HttpMethod;
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
