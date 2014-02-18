module CHAOS.Portal.Client
{
	export class MetadataSchema
    {
		public static Get(guid : string = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("MetadataSchema/Get", CHAOS.Portal.Client.HttpMethod.Get, { guid: guid }, true);
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

		public static HasPermissionToMetadataSchema(guid: string, permission: number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
           if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("MetadataSchema/HasPermissionToMetadataSchema", CHAOS.Portal.Client.HttpMethod.Get, { guid: guid, permission: permission }, true);
		}
    }

	export class Folder
	{
		public static GetPermission(folderID : number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Folder/GetPermission", CHAOS.Portal.Client.HttpMethod.Get, { folderID: folderID }, true);
		}

		public static SetPermission(userGuid: string, groupGuid: string, folderID: number, permission:number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Folder/SetPermission", CHAOS.Portal.Client.HttpMethod.Get, { userGuid: userGuid, groupGuid: groupGuid, folderID: folderID, permission: permission }, true);
		}

		public static Get(id: number = null, folderTypeID: number = null, parentID: number = null, permission:number = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Folder/Get", CHAOS.Portal.Client.HttpMethod.Get, { id: id, folderTypeID: folderTypeID, parentID: parentID, permission: permission }, true);
		}

		public static Delete(id: number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Folder/Delete", CHAOS.Portal.Client.HttpMethod.Get, { id: id }, true);
		}

		public static Update(id: number, newTitle: string, newParentID: number = null, newFolderTypeID: number = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Folder/Update", CHAOS.Portal.Client.HttpMethod.Get, { id: id, newTitle: newTitle, newFolderTypeID: newFolderTypeID, newParentID: newParentID }, true);
		}

		public static Create(subscriptionGuid: string, title: string, parentID: number = null, folderTypeID: number = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Folder/Create", CHAOS.Portal.Client.HttpMethod.Get, { subscriptionGuid: subscriptionGuid, title: title, parentID: parentID, folderTypeID: folderTypeID }, true);
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

	export class Link
	{
		public static Create(objectGuid: string, folderID: number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Link/Create", CHAOS.Portal.Client.HttpMethod.Get, { objectGuid: objectGuid, folderID: folderID }, true);
		}

		public static Update(objectGuid: string, folderID: number, newFolderID:number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Link/Update", CHAOS.Portal.Client.HttpMethod.Get, { objectGuid: objectGuid, folderID: folderID, newFolderID: newFolderID }, true);
		}

		public static Delete(objectGuid: string, folderID: number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Link/Delete", CHAOS.Portal.Client.HttpMethod.Get, { objectGuid: objectGuid, folderID: folderID }, true);
		}
	}

	export class Object
	{
		public static Create(guid: string, objectTypeID: number, folderID: number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Object/Create", CHAOS.Portal.Client.HttpMethod.Get, {guid: guid, objectTypeID: objectTypeID, folderID: folderID}, true);
		}

		public static Get(objectGuids: string[], accessPointGuid:string = null, includeMetadata: boolean = false, includeFiles: boolean = false, includeObjectRelations: boolean = false, includeFolders: boolean = false, includeAccessPoints: boolean = false, pageSize:number = 10, pageIndex = 0, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Object/Get", CHAOS.Portal.Client.HttpMethod.Get, { objectGuids: objectGuids.join(), accessPointGuid: accessPointGuid, includeMetadata: includeMetadata, includeFiles: includeFiles, includeObjectRelations: includeObjectRelations, includeFolders: includeFolders, includeAccessPoints: includeAccessPoints, pageSize: pageSize, pageIndex: pageIndex }, true );
		}

		public static SetPublishSettings(objectGuid: string, accessPointGuid: string, startDate: Date, endDate: Date, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Object/SetPublishSettings", CHAOS.Portal.Client.HttpMethod.Get, {objectGuid: objectGuid, accessPointGuid: accessPointGuid, startDate: startDate, endDate: endDate}, true);
		}
	}

	export class ObjectRelation
	{
		public static Set(object1Guid: string, object2Guid: string, objectRelationTypeID: number, sequence: number = null, metadataGuid: string = null, metadataSchemaGuid: string = null, languageCode: string = null, metadataXml : string = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("ObjectRelation/Set", CHAOS.Portal.Client.HttpMethod.Post, { object1Guid: object1Guid, object2Guid: object2Guid, objectRelationTypeID: objectRelationTypeID, sequence: sequence, metadataGuid: metadataGuid, metadataSchemaGuid: metadataSchemaGuid, languageCode: languageCode, metadataXml: metadataXml }, true);
		}

		public static Delete(object1Guid: string, object2Guid: string, objectRelationTypeID: number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("ObjectRelation/Delete", CHAOS.Portal.Client.HttpMethod.Get, { object1Guid: object1Guid, object2Guid: object2Guid, objectRelationTypeID: objectRelationTypeID }, true);
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
		public static Set(objectGuid: string, metadataSchemaGuid: string, languageCode: string, revisionID: number, metadataXml: string, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): ICallState<any>
    	{
			if(serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Metadata/Set", CHAOS.Portal.Client.HttpMethod.Post, { objectGuid: objectGuid, metadataSchemaGuid: metadataSchemaGuid, languageCode: languageCode, revisionID: revisionID, metadataXml: metadataXml }, true);
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