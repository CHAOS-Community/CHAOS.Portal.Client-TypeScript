/// <reference path="PortalClient.ts"/>
/// <reference path="PortalExtensions.ts"/>

module CHAOS.Portal.Client
{
	export class MetadataSchema
    {
		public static Get(metadataSchemaGUID: string = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("MetadataSchema/Get", CHAOS.Portal.Client.HttpMethod.Get, { metadataSchemaGUID: metadataSchemaGUID }, true);
    	}

		public static Create(name: string, schemaXml: string, guid: string = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
           if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("MetadataSchema/Create", CHAOS.Portal.Client.HttpMethod.Post, { name: name, schemaXml: schemaXml, guid: guid }, true);
		}

		public static Update(name: string, schemaXml: string, guid: string, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
           if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("MetadataSchema/Update", CHAOS.Portal.Client.HttpMethod.Post, { name: name, schemaXml: schemaXml, guid: guid }, true);
		}

		public static Delete(guid: string, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
           if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("MetadataSchema/Delete", CHAOS.Portal.Client.HttpMethod.Get, { guid: guid }, true);
		}

		public static HasPermissionToMetadataSchema(guid: string, MetadataSchemaPermission: number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
           if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("MetadataSchema/HasPermissionToMetadataSchema", CHAOS.Portal.Client.HttpMethod.Get, { guid: guid, MetadataSchemaPermission: MetadataSchemaPermission }, true);
		}
    }

	export class Folder
    {
		public static Get(id: number = null, folderTypeID: number = null, parentID: number = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Folder/Get", CHAOS.Portal.Client.HttpMethod.Get, { id: id, folderTypeID: folderTypeID, parentID: parentID }, true);
    	}
    }

	export class FolderType
	{
		public static Get(name: string = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("FolderType/Get", CHAOS.Portal.Client.HttpMethod.Get, { name: name}, true);
    	}
	}

	export class Format
	{
		public static Get(name: string = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Format/Get", CHAOS.Portal.Client.HttpMethod.Get, { name: name}, true);
    	}
	}

	export class FormatType
	{
		public static Get(name: string = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("FormatType/Get", CHAOS.Portal.Client.HttpMethod.Get, { name: name}, true);
    	}
	}

	export class Language
	{
		public static Get(name: string = null, languageCode: string = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Language/Get", CHAOS.Portal.Client.HttpMethod.Get, { name: name, languageCode:languageCode}, true);
    	}
	}

	export class Object
	{
		public static Create(guid: string, objectTypeID: number, folderID: number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Object/Create", CHAOS.Portal.Client.HttpMethod.Post, {guid: guid, objectTypeID: objectTypeID, folderID: folderID}, true);
		}

		public static Get(objectGuids: string[], includeMetadata: boolean = false, includeFiles: boolean = false, includeObjectRelations: boolean = false, includeFolders: boolean = false, includeAccessPoints: boolean = false, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Object/Get", CHAOS.Portal.Client.HttpMethod.Post, { objectGuids: objectGuids.join(), includeMetadata: includeMetadata, includeFiles: includeFiles, includeObjectRelations: includeObjectRelations, includeFolders: includeFolders, includeAccessPoints: includeAccessPoints }, true );
		}

		public static SetPublishSettings(objectGUID: string, accessPointGUID: string, startDate: Date, endDate: Date, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Object/SetPublishSettings", CHAOS.Portal.Client.HttpMethod.Post, {objectGUID: objectGUID, accessPointGUID: accessPointGUID, startDate: startDate, endDate: endDate}, true);
		}
	}

	export class ObjectRelationType 
	{
		public static Get(value: string = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("ObjectRelationType/Get", CHAOS.Portal.Client.HttpMethod.Get, { value: value}, true);
    	}
	}

	export class Metadata
	{
		public static Set(objectGUID: string, metadataSchemaGUID: string, languageCode: string, revisionID: number, metadataXML: string, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Metadata/Set", CHAOS.Portal.Client.HttpMethod.Post, { objectGUID: objectGUID, metadataSchemaGUID: metadataSchemaGUID, languageCode: languageCode, revisionID: revisionID, metadataXML: metadataXML }, true);
    	}
	}

	export class ObjectType
	{
		public static Get(serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("ObjectType/Get", CHAOS.Portal.Client.HttpMethod.Get, null, true);
    	}

		public static Set(name: string, id: number = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("ObjectType/Set", CHAOS.Portal.Client.HttpMethod.Get, { id: id, name: name }, true);
    	}

		public static Delete(id: number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("ObjectType/Delete", CHAOS.Portal.Client.HttpMethod.Get, { id: id }, true);
    	}
	}

	export class UserManagement
	{
		public static GetUserFolder(userGuid: string = null, createIfMissing: boolean = true, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("UserManagement/GetUserFolder", CHAOS.Portal.Client.HttpMethod.Get, { userGuid: userGuid, createIfMissing: createIfMissing }, true);
		}

		public static GetUserObject(userGuid: string = null, createIfMissing: boolean = true, includeMetata: boolean = false, includeFiles: boolean = false, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
	    {
	        if (serviceCaller == null)
	            serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("UserManagement/GetUserObject", CHAOS.Portal.Client.HttpMethod.Get, { userGuid: userGuid, createIfMissing: createIfMissing, includeMetata: includeMetata, includeFiles: includeFiles }, true);
		}
	}

	export class UserProfile
	{
		public static Get(metadataSchemaGuid: string, userGuid: string = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
	    {
	        if (serviceCaller == null)
	            serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

	        return serviceCaller.CallService("UserProfile/Get", CHAOS.Portal.Client.HttpMethod.Get, {metadataSchemaGuid: metadataSchemaGuid, userGuid: userGuid }, true);
	    }

		public static Set(metadataSchemaGuid: string, metadata: string, userGuid: string = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
	    {
	        if (serviceCaller == null)
	            serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

	        return serviceCaller.CallService("UserProfile/Set", CHAOS.Portal.Client.HttpMethod.Post, { metadataSchemaGuid: metadataSchemaGuid, metadata: metadata, userGuid: userGuid }, true);
	    }
	}
}