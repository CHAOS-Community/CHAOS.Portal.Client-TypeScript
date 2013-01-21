/// <reference path="../../app/CHAOS.Portal.Client/PortalClient.ts"/>
/// <reference path="../../app/CHAOS.Portal.Client/PortalExtensions.ts"/>
/// <reference path="../../app/CHAOS.Portal.Client/MCMExtensions.ts"/>

var client = CHAOS.Portal.Client.Initialize(""); throw "Insert api path";

client.SessionAcquired().Add(session =>
{
	document.getElementById('guid').textContent = session.GUID;

	CHAOS.Portal.Client.EmailPassword.Login(response =>
	{
		document.getElementById('user').textContent = response.Error == null ? response.Result.Results[0].Email : response.Error.Message;
	}, "email", "password"); throw "Insert email and password";

});

client.SessionAuthenticated().Add(() =>
{
	CHAOS.Portal.Client.MetadataSchema.Get(response =>
	{
		var schemas = document.getElementById("Schemas");

		if (response.Error != null)
		{
			schemas.textContent = response.Error.Message;
			return;
		}

		response.Result.Results.forEach(v => {
			var e = document.createElement("div");
			e.textContent  = v.Name;
			schemas.appendChild(e);
		});
	});
});