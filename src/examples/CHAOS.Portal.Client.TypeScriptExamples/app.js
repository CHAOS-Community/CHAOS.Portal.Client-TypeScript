var client = CHAOS.Portal.Client.Initialize("http://api.test.chaos-systems.com/");
client.SessionAcquired().Add(function (session) {
    document.getElementById('guid').textContent = session.GUID;
    CHAOS.Portal.Client.EmailPassword.Login(function (response) {
        document.getElementById('user').textContent = response.Error == null ? response.Result.Results[0].Email : response.Error.Message;
    }, "jacob@geckon.com", "1234");
});
client.SessionAuthenticated().Add(function () {
    CHAOS.Portal.Client.MetadataSchema.Get(function (response) {
        var schemas = document.getElementById("Schemas");
        if(response.Error != null) {
            schemas.textContent = response.Error.Message;
            return;
        }
        response.Result.Results.forEach(function (v) {
            var e = document.createElement("div");
            e.textContent = v.Name;
            schemas.appendChild(e);
        });
    });
});
//@ sourceMappingURL=app.js.map
