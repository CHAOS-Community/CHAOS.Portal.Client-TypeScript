var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var MetadataSchema = (function () {
                function MetadataSchema() { }
                MetadataSchema.Get = function Get(metadataSchemaGUID, serviceCaller) {
                    if (typeof metadataSchemaGUID === "undefined") { metadataSchemaGUID = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("MetadataSchema/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        metadataSchemaGUID: metadataSchemaGUID
                    }, true);
                };
                MetadataSchema.Create = function Create(name, schemaXml, guid, serviceCaller) {
                    if (typeof guid === "undefined") { guid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("MetadataSchema/Create", CHAOS.Portal.Client.HttpMethod.Post(), {
                        name: name,
                        schemaXml: schemaXml,
                        guid: guid
                    }, true);
                };
                MetadataSchema.Update = function Update(name, schemaXml, guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("MetadataSchema/Update", CHAOS.Portal.Client.HttpMethod.Post(), {
                        name: name,
                        schemaXml: schemaXml,
                        guid: guid
                    }, true);
                };
                MetadataSchema.Delete = function Delete(guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("MetadataSchema/Delete", CHAOS.Portal.Client.HttpMethod.Get(), {
                        guid: guid
                    }, true);
                };
                MetadataSchema.HasPermissionToMetadataSchema = function HasPermissionToMetadataSchema(guid, MetadataSchemaPermission, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("MetadataSchema/HasPermissionToMetadataSchema", CHAOS.Portal.Client.HttpMethod.Get(), {
                        guid: guid,
                        MetadataSchemaPermission: MetadataSchemaPermission
                    }, true);
                };
                return MetadataSchema;
            })();
            Client.MetadataSchema = MetadataSchema;            
            var Folder = (function () {
                function Folder() { }
                Folder.Get = function Get(id, folderTypeID, parentID, serviceCaller) {
                    if (typeof id === "undefined") { id = null; }
                    if (typeof folderTypeID === "undefined") { folderTypeID = null; }
                    if (typeof parentID === "undefined") { parentID = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Folder/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        id: id,
                        folderTypeID: folderTypeID,
                        parentID: parentID
                    }, true);
                };
                return Folder;
            })();
            Client.Folder = Folder;            
            var FolderType = (function () {
                function FolderType() { }
                FolderType.Get = function Get(name, serviceCaller) {
                    if (typeof name === "undefined") { name = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("FolderType/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        name: name
                    }, true);
                };
                return FolderType;
            })();
            Client.FolderType = FolderType;            
            var Format = (function () {
                function Format() { }
                Format.Get = function Get(name, serviceCaller) {
                    if (typeof name === "undefined") { name = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Format/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        name: name
                    }, true);
                };
                return Format;
            })();
            Client.Format = Format;            
            var FormatType = (function () {
                function FormatType() { }
                FormatType.Get = function Get(name, serviceCaller) {
                    if (typeof name === "undefined") { name = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("FormatType/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        name: name
                    }, true);
                };
                return FormatType;
            })();
            Client.FormatType = FormatType;            
            var Language = (function () {
                function Language() { }
                Language.Get = function Get(name, languageCode, serviceCaller) {
                    if (typeof name === "undefined") { name = null; }
                    if (typeof languageCode === "undefined") { languageCode = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Language/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        name: name,
                        languageCode: languageCode
                    }, true);
                };
                return Language;
            })();
            Client.Language = Language;            
            var Object = (function () {
                function Object() { }
                Object.Create = function Create(guid, objectTypeID, folderID, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Object/Create", CHAOS.Portal.Client.HttpMethod.Post(), {
                        guid: guid,
                        objectTypeID: objectTypeID,
                        folderID: folderID
                    }, true);
                };
                Object.Get = function Get(objectGuids, includeMetadata, includeFiles, includeObjectRelations, includeFolders, includeAccessPoints, serviceCaller) {
                    if (typeof includeMetadata === "undefined") { includeMetadata = false; }
                    if (typeof includeFiles === "undefined") { includeFiles = false; }
                    if (typeof includeObjectRelations === "undefined") { includeObjectRelations = false; }
                    if (typeof includeFolders === "undefined") { includeFolders = false; }
                    if (typeof includeAccessPoints === "undefined") { includeAccessPoints = false; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Object/Get", CHAOS.Portal.Client.HttpMethod.Post(), {
                        objectGuids: objectGuids.join(),
                        includeMetadata: includeMetadata,
                        includeFiles: includeFiles,
                        includeObjectRelations: includeObjectRelations,
                        includeFolders: includeFolders,
                        includeAccessPoints: includeAccessPoints
                    }, true);
                };
                Object.SetPublishSettings = function SetPublishSettings(objectGUID, accessPointGUID, startDate, endDate, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Object/SetPublishSettings", CHAOS.Portal.Client.HttpMethod.Post(), {
                        objectGUID: objectGUID,
                        accessPointGUID: accessPointGUID,
                        startDate: startDate,
                        endDate: endDate
                    }, true);
                };
                return Object;
            })();
            Client.Object = Object;            
            var ObjectRelationType = (function () {
                function ObjectRelationType() { }
                ObjectRelationType.Get = function Get(value, serviceCaller) {
                    if (typeof value === "undefined") { value = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("ObjectRelationType/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        value: value
                    }, true);
                };
                return ObjectRelationType;
            })();
            Client.ObjectRelationType = ObjectRelationType;            
            var Metadata = (function () {
                function Metadata() { }
                Metadata.Set = function Set(objectGUID, metadataSchemaGUID, languageCode, revisionID, metadataXML, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("Metadata/Set", CHAOS.Portal.Client.HttpMethod.Post(), {
                        objectGUID: objectGUID,
                        metadataSchemaGUID: metadataSchemaGUID,
                        languageCode: languageCode,
                        revisionID: revisionID,
                        metadataXML: metadataXML
                    }, true);
                };
                return Metadata;
            })();
            Client.Metadata = Metadata;            
            var ObjectType = (function () {
                function ObjectType() { }
                ObjectType.Get = function Get(serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("ObjectType/Get", CHAOS.Portal.Client.HttpMethod.Get(), null, true);
                };
                ObjectType.Set = function Set(name, id, serviceCaller) {
                    if (typeof id === "undefined") { id = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("ObjectType/Set", CHAOS.Portal.Client.HttpMethod.Get(), {
                        id: id,
                        name: name
                    }, true);
                };
                ObjectType.Delete = function Delete(id, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    return serviceCaller.CallService("ObjectType/Delete", CHAOS.Portal.Client.HttpMethod.Get(), {
                        id: id
                    }, true);
                };
                return ObjectType;
            })();
            Client.ObjectType = ObjectType;            
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
