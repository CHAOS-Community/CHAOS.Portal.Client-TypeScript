throw "Insert api path";
var client = CHAOS.Portal.Client.Initialize("");

client.SessionAcquired().Add(function (session) {
    document.getElementById('guid').textContent = session.Guid;

    CHAOS.Portal.Client.MetadataSchema.Get().WithCallback(function (response) {
        return ShowResults("Schemas", response, function (item) {
            return item.Name + " - " + item.Guid;
        });
    });

    CHAOS.Portal.Client.View.List().WithCallback(function (response) {
        return ShowResults("Views", response, function (item) {
            return item.Name;
        });
    });
});

function ShowResults(elementName, response, resultParser) {
    var element = document.getElementById(elementName);

    if (response.Error == null) {
        element.textContent = "";

        response.Result.Results.forEach(function (result) {
            var e = document.createElement("div");
            e.textContent = resultParser(result);
            element.appendChild(e);
        });
    } else {
        element.textContent = "Error: " + response.Error.Message;
        return;
    }
}
