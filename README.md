#CHAOS.Portal.Client (TypeScript)
This is a TypeScript (fully JavaScript compatible) Portal API Client. It enables easy communication with a CHAOS Portal API (protocol version 6).  
  
##Content
- [Dependencies](#user-content-dependencies)
- [Usage](#Usage)
	- [TypeScript](#user-content-TypeScript)
	- [JavaScript](#user-content-JavaScript)
- [Code](#user-content-Code)
- [Examples](#user-content-Examples)
- [Reporting problems](#user-content-Reporting-problems)
  
##Dependencies
None

##Usage
###TypeScript
```TypeScript
var client = CHAOS.Portal.Client.Initialize("http://MyPortalAPI.com");
client.SessionAcquired().Add(session =>
{
	CHAOS.Portal.Client.MetadataSchema.Get().WithCallback(response => 
	{
		console.log("First schema name" + response.Body.Results[0].Name);
	}
});
```
###JavaScript
```JavaScript
var client = client.SessionAcquired().Add(function()
{
	CHAOS.Portal.Client.MetadataSchema.Get().WithCallback(function(response)
	{
		console.log("First schema name" + response.Body.Results[0].Name);
	}
});
```
  
##Code
The source code is located in the [src/app](tree/master/src/app/CHAOS.Portal.Client) folder.  

##Examples
The examples are located in the [src/examples](tree/master/src/examples) folder.  
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