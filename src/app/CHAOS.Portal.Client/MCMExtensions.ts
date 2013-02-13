/// <reference path="PortalClient.ts"/>
/// <reference path="PortalExtensions.ts"/>

module CHAOS.Portal.Client
{
	export class MetadataSchema
    {
    	public static Get(callback:(response: CHAOS.Portal.Client.IPortalResponse) => void = null, metadataSchemaGUID:string = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null)
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			serviceCaller.CallService(callback, "MetadataSchema/Get", CHAOS.Portal.Client.HttpMethod.Get(), { metadataSchemaGUID: metadataSchemaGUID }, true);
    	}
    }

	export class Folder
    {
    	public static Get(callback:(response: CHAOS.Portal.Client.IPortalResponse) => void = null, id:number = null, folderTypeID:number = null, parentID:number = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null)
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			serviceCaller.CallService(callback, "Folder/Get", CHAOS.Portal.Client.HttpMethod.Get(), { id: id, folderTypeID: folderTypeID, parentID: parentID }, true);
    	}
    }

	export class Object
	{
		public static Create(callback: (response: CHAOS.Portal.Client.IPortalResponse) => void, guid:string, objectTypeID:number, folderID:number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null)
		{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			serviceCaller.CallService(callback, "Object/Create", CHAOS.Portal.Client.HttpMethod.Post(), {guid: guid, objectTypeID: objectTypeID, folderID: folderID}, true);
		}

		public static Get(callback: (response: CHAOS.Portal.Client.IPortalResponse) => void = null, query:string = null, sort:string = null, accessPointGUID:string = null, pageIndex:number = 0, pageSize:number = 10, includeMetadata:bool = false, includeFiles:bool = false, includeObjectRelations:bool = false, includeAccessPoints:bool = false, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null)
		{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			serviceCaller.CallService(callback, "Object/Get", CHAOS.Portal.Client.HttpMethod.Post(), {query: query, sort: sort, accessPointGUID: accessPointGUID, pageIndex: pageIndex, pageSize: pageSize, includeMetadata: includeMetadata, includeFiles: includeFiles, includeObjectRelations: includeObjectRelations}, accessPointGUID == null);
		}

		public static GetByFolderID(callback: (response: CHAOS.Portal.Client.IPortalResponse) => void, folderID:number, includeChildFolders:bool = true, sort: string = null, accessPointGUID: string = null, pageIndex: number = 0, pageSize: number = 10, includeMetadata: bool = false, includeFiles: bool = false, includeObjectRelations: bool = false, includeAccessPoints: bool = false, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null)
		{
			Get(callback, (includeChildFolders ? "(FolderTree:" : "(FolderID:") + folderID + ")", sort, accessPointGUID, pageIndex, pageSize, includeMetadata, includeFiles, includeObjectRelations, includeAccessPoints, serviceCaller);
		}

		public static GetByObjectGUID(callback: (response: CHAOS.Portal.Client.IPortalResponse) => void, objectGUID:string, accessPointGUID: string = null, includeMetadata: bool = false, includeFiles: bool = false, includeObjectRelations: bool = false, includeAccessPoints: bool = false, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null)
		{
			Get(callback, "(GUID:" + objectGUID + ")", null, accessPointGUID, 0, 1, includeMetadata, includeFiles, includeObjectRelations, includeAccessPoints, serviceCaller);
		}

		public static SetPublishSettings(callback: (response: CHAOS.Portal.Client.IPortalResponse) => void, objectGUID:string, accessPointGUID:string, startDate:Date, endDate:Date, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null)
		{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			serviceCaller.CallService(callback, "Object/SetPublishSettings", CHAOS.Portal.Client.HttpMethod.Post(), {objectGUID: objectGUID, accessPointGUID: accessPointGUID, startDate: startDate, endDate: endDate}, true);
		}
	}

	export class Metadata
	{
		public static Set(callback:(response: CHAOS.Portal.Client.IPortalResponse) => void, objectGUID:string, metadataSchemaGUID:string, languageCode:string, revisionID:number, metadataXML:string, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null)
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			serviceCaller.CallService(callback, "Metadata/Set", CHAOS.Portal.Client.HttpMethod.Post(), { objectGUID: objectGUID, metadataSchemaGUID: metadataSchemaGUID, languageCode: languageCode, revisionID: revisionID, metadataXML: metadataXML }, true);
    	}
	}
}