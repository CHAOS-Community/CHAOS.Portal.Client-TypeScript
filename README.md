#CHAOS.Portal.Client (TypeScript)
This is a TypeScript (fully JavaScript compatible) Portal API Client. It enables easy communication with a CHAOS Portal API (protocol version 6).  
  
##Content
- [Dependencies](#user-content-dependencies)
- [Usage](#Usage)
	- [TypeScript](#user-content-typescript)
	- [JavaScript](#user-content-javascript)
- [Code](#user-content-code)
- [Examples](#user-content-examples)
- [Reporting problems](#user-content-reporting-problems)
  
##Dependencies
None

##Usage
For complete usage, see [examples](#user-content-examples).
###TypeScript
Creating a session and logging in  
```TypeScript
var client = CHAOS.Portal.Client.Initialize("http://MyPortalAPI.com"); //Create client instance, session will be created automatically
client.SessionAcquired().Add(session => //Wait for session to be created
{
	CHAOS.Portal.Client.EmailPassword.Login("My@email.com", "MyPassword").WithCallback(response => 
	{
		console.log("User Email: " + response.Body.Results[0].Email);
	});
});
```
Calling a custom method without adding the full extension to the SDK
```TypeScript
var client = CHAOS.Portal.Client.Initialize("http://MyPortalAPI.com"); //Create client instance, session will be created automatically
var serviceCaller = <CHAOS.Portal.Client.IServiceCaller>client; //Cast to IServiceCaller. CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller() will get the instance as well
serviceCaller.CallService("MyExtension/MyMethod", CHAOS.Portal.Client.HttpMethod.Get, { parameter: value }, false); //Call MyExtention/MyMethod with one parameter and do not require session. To require a session pass true as the fourth argument
```
###JavaScript
Creating a session and logging in  
```JavaScript
var client = CHAOS.Portal.Client.Initialize("http://MyPortalAPI.com"); //Create client instance, session will be created automatically
client.SessionAcquired().Add(function() //Wait for session to be created
{
	CHAOS.Portal.Client.EmailPassword.Login("My@email.com", "MyPassword").WithCallback(function(response)
	{
		console.log("User Email: " + response.Body.Results[0].Email);
	});
});
```
Calling a custom method without adding the full extension to the SDK
```JavaScript
var client = CHAOS.Portal.Client.Initialize("http://MyPortalAPI.com"); //Create client instance, session will be created automatically
//CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller() will return the PortalClient instance
client.CallService("MyExtension/MyMethod", 0, { parameter: value }, false); //Call MyExtention/MyMethod with one parameter and do not require session. Pass 1 as the second argument for POST methods.  To require a session pass true as the fourth argument
```
  
##Code
The source code is located in the [src/app](/tree/master/src/app/CHAOS.Portal.Client) folder.  

##Examples
The examples are located in the [src/examples](/tree/master/src/examples) folder.  
Make sure to update the referenced script file paths if the examples are moved.

##Reporting problems
If you encounter any problems using this project, please report them using the "Issues" section of the projects Github page.

##Links
[Official CHAOS Community website](http://www.chaos-community.org/)  
[This project on GitHub](https://github.com/CHAOS-Community/CHAOS.Portal.Client-JavaScript)  
[Portal project on GitHub](https://github.com/CHAOS-Community/Portal)  
[PHP client on GitHub](https://github.com/CHAOS-Community/CHAOS.Portal.Client-PHP)  
[.NET client on GitHub](https://github.com/CHAOS-Community/CHAOS.Portal.Client-.NET)

##License  
This program is free software: you can redistribute it and/or modify  
it under the terms of the GNU Lesser General Public License as published by  
the Free Software Foundation, either version 3 of the License, or  
(at your option) any later version.  
  
This program is distributed in the hope that it will be useful,  
but WITHOUT ANY WARRANTY; without even the implied warranty of  
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the  
GNU Lesser General Public License for more details.  
  
You should have received a copy of the GNU Lesser General Public License  
along with this program.  If not, see <[http://www.gnu.org/licenses/](http://www.gnu.org/licenses/)>.  
  
Copyright 2013 CHAOS ApS