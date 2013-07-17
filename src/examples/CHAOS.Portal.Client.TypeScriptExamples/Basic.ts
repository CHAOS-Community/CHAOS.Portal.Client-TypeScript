/// <reference path="../../app/CHAOS.Portal.Client/PortalClient.ts"/>
/// <reference path="../../app/CHAOS.Portal.Client/PortalExtensions.ts"/>
/// <reference path="../../app/CHAOS.Portal.Client/MCMExtensions.ts"/>

throw "Insert api path";
var client = CHAOS.Portal.Client.Initialize("");

client.SessionAcquired().Add(session =>
{
	document.getElementById('guid').textContent = session.Guid;

	CHAOS.Portal.Client.MetadataSchema.Get().WithCallback(response => ShowResults("Schemas", response, item => item.Name + " - " + item.Guid));

	CHAOS.Portal.Client.View.List().WithCallback(response => ShowResults("Views", response, item => item.Name));
});

function ShowResults(elementName: string, response: CHAOS.Portal.Client.IPortalResponse<any>, resultParser:(any) => string):void
{
	var element = document.getElementById(elementName);

	if (response.Error == null)
	{
		element.textContent = "";

		response.Result.Results.forEach(result => 
		{
			var e = document.createElement("div");
			e.textContent  = resultParser(result);
			element.appendChild(e);
		});
	}
	else
	{
		element.textContent = "Error: " + response.Error.Message;
		return;
	}	
}