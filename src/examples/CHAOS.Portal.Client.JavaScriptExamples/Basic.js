var client = CHAOS.Portal.Client.Initialize(""); throw "Insert api path";

client.SessionAcquired().Add(function (session)
{
	document.getElementById('guid').textContent = session.Guid;

	CHAOS.Portal.Client.MetadataSchema.Get().WithCallback(function (response)
	{
		ShowResult("Schemas", response, function (result) { return result.Name + " - " + result.Guid; });
	});
	
	CHAOS.Portal.Client.View.List().WithCallback(function (response)
	{
		ShowResult("Views", response, function (result) { return result.Name; });
	});
});

function ShowResult(elementName, response, resultParser)
{
	var element = document.getElementById(elementName);

	if (response.Error == null)
	{
		element.textContent = "";

		response.Result.Results.forEach(function (result)
		{
			var e = document.createElement("div");
			e.textContent = resultParser(result);
			element.appendChild(e);
		});
	}
	else
	{
		element.textContent = "Error: " + response.Error.Message;
	}
}