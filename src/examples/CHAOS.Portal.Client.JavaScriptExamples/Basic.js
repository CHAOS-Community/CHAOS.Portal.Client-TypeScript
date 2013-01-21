var client = CHAOS.Portal.Client.Initialize(""); throw "Insert api path";

client.SessionAcquired().Add(function (session)
{
	document.getElementById('guid').textContent = session.GUID;
});