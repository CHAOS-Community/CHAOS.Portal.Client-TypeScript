var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var MetadataSchema = (function () {
                function MetadataSchema() { }
                MetadataSchema.Get = function Get(callback, metadataSchemaGUID, serviceCaller) {
                    if (typeof callback === "undefined") { callback = null; }
                    if (typeof metadataSchemaGUID === "undefined") { metadataSchemaGUID = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    serviceCaller.CallService(callback, "MetadataSchema/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        metadataSchemaGUID: metadataSchemaGUID
                    }, true);
                }
                return MetadataSchema;
            })();
            Client.MetadataSchema = MetadataSchema;            
            var Folder = (function () {
                function Folder() { }
                Folder.Get = function Get(callback, id, folderTypeID, parentID, serviceCaller) {
                    if (typeof callback === "undefined") { callback = null; }
                    if (typeof id === "undefined") { id = null; }
                    if (typeof folderTypeID === "undefined") { folderTypeID = null; }
                    if (typeof parentID === "undefined") { parentID = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    serviceCaller.CallService(callback, "Folder/Get", CHAOS.Portal.Client.HttpMethod.Get(), {
                        id: id,
                        folderTypeID: folderTypeID,
                        parentID: parentID
                    }, true);
                }
                return Folder;
            })();
            Client.Folder = Folder;            
            var Object = (function () {
                function Object() { }
                Object.Create = function Create(callback, guid, objectTypeID, folderID, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    serviceCaller.CallService(callback, "Object/Create", CHAOS.Portal.Client.HttpMethod.Post(), {
                        guid: guid,
                        objectTypeID: objectTypeID,
                        folderID: folderID
                    }, true);
                }
                Object.Get = function Get(callback, query, sort, accessPointGUID, pageIndex, pageSize, includeMetadata, includeFiles, includeObjectRelations, includeAccessPoints, serviceCaller) {
                    if (typeof callback === "undefined") { callback = null; }
                    if (typeof query === "undefined") { query = null; }
                    if (typeof sort === "undefined") { sort = null; }
                    if (typeof accessPointGUID === "undefined") { accessPointGUID = null; }
                    if (typeof pageIndex === "undefined") { pageIndex = 0; }
                    if (typeof pageSize === "undefined") { pageSize = 10; }
                    if (typeof includeMetadata === "undefined") { includeMetadata = false; }
                    if (typeof includeFiles === "undefined") { includeFiles = false; }
                    if (typeof includeObjectRelations === "undefined") { includeObjectRelations = false; }
                    if (typeof includeAccessPoints === "undefined") { includeAccessPoints = false; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    serviceCaller.CallService(callback, "Object/Get", CHAOS.Portal.Client.HttpMethod.Post(), {
                        query: query,
                        sort: sort,
                        accessPointGUID: accessPointGUID,
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                        includeMetadata: includeMetadata,
                        includeFiles: includeFiles,
                        includeObjectRelations: includeObjectRelations
                    }, true);
                }
                Object.GetByFolderID = function GetByFolderID(callback, folderID, includeChildFolders, sort, accessPointGUID, pageIndex, pageSize, includeMetadata, includeFiles, includeObjectRelations, includeAccessPoints, serviceCaller) {
                    if (typeof includeChildFolders === "undefined") { includeChildFolders = true; }
                    if (typeof sort === "undefined") { sort = null; }
                    if (typeof accessPointGUID === "undefined") { accessPointGUID = null; }
                    if (typeof pageIndex === "undefined") { pageIndex = 0; }
                    if (typeof pageSize === "undefined") { pageSize = 10; }
                    if (typeof includeMetadata === "undefined") { includeMetadata = false; }
                    if (typeof includeFiles === "undefined") { includeFiles = false; }
                    if (typeof includeObjectRelations === "undefined") { includeObjectRelations = false; }
                    if (typeof includeAccessPoints === "undefined") { includeAccessPoints = false; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    Object.Get(callback, (includeChildFolders ? "(FolderTree:" : "(FolderID:") + folderID + ")", sort, accessPointGUID, pageIndex, pageSize, includeMetadata, includeFiles, includeObjectRelations, includeAccessPoints, serviceCaller);
                }
                Object.GetByObjectGUID = function GetByObjectGUID(callback, objectGUID, accessPointGUID, includeMetadata, includeFiles, includeObjectRelations, includeAccessPoints, serviceCaller) {
                    if (typeof accessPointGUID === "undefined") { accessPointGUID = null; }
                    if (typeof includeMetadata === "undefined") { includeMetadata = false; }
                    if (typeof includeFiles === "undefined") { includeFiles = false; }
                    if (typeof includeObjectRelations === "undefined") { includeObjectRelations = false; }
                    if (typeof includeAccessPoints === "undefined") { includeAccessPoints = false; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    Object.Get(callback, "(GUID:" + objectGUID + ")", null, accessPointGUID, 0, 1, includeMetadata, includeFiles, includeObjectRelations, includeAccessPoints, serviceCaller);
                }
                Object.SetPublishSettings = function SetPublishSettings(callback, objectGUID, accessPointGUID, startDate, endDate, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    serviceCaller.CallService(callback, "Object/SetPublishSettings", CHAOS.Portal.Client.HttpMethod.Post(), {
                        objectGUID: objectGUID,
                        accessPointGUID: accessPointGUID,
                        startDate: startDate,
                        endDate: endDate
                    }, true);
                }
                return Object;
            })();
            Client.Object = Object;            
            var Metadata = (function () {
                function Metadata() { }
                Metadata.Set = function Set(callback, objectGUID, metadataSchemaGUID, languageCode, revisionID, metadataXML, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if(serviceCaller == null) {
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    }
                    serviceCaller.CallService(callback, "Metadata/Set", CHAOS.Portal.Client.HttpMethod.Post(), {
                        objectGUID: objectGUID,
                        metadataSchemaGUID: metadataSchemaGUID,
                        languageCode: languageCode,
                        revisionID: revisionID,
                        metadataXML: metadataXML
                    }, true);
                }
                return Metadata;
            })();
            Client.Metadata = Metadata;            
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//@ sourceMappingURL=MCMExtensions.js.map
