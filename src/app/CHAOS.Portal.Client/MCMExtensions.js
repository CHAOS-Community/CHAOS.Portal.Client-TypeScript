var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        /// <reference path="PortalClient.ts"/>
        /// <reference path="PortalExtensions.ts"/>
        (function (Client) {
            var MetadataSchema = (function () {
                function MetadataSchema() {
                }
                MetadataSchema.Get = function (guid, serviceCaller) {
                    if (typeof guid === "undefined") { guid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("MetadataSchema/Get", CHAOS.Portal.Client.HttpMethod.Get, { guid: guid }, true);
                };

                MetadataSchema.Create = function (name, schemaXml, guid, serviceCaller) {
                    if (typeof guid === "undefined") { guid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("MetadataSchema/Create", CHAOS.Portal.Client.HttpMethod.Post, { name: name, schemaXml: schemaXml, guid: guid }, true);
                };

                MetadataSchema.Update = function (name, schemaXml, guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("MetadataSchema/Update", CHAOS.Portal.Client.HttpMethod.Post, { name: name, schemaXml: schemaXml, guid: guid }, true);
                };

                MetadataSchema.Delete = function (guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("MetadataSchema/Delete", CHAOS.Portal.Client.HttpMethod.Get, { guid: guid }, true);
                };

                MetadataSchema.HasPermissionToMetadataSchema = function (guid, permission, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("MetadataSchema/HasPermissionToMetadataSchema", CHAOS.Portal.Client.HttpMethod.Get, { guid: guid, permission: permission }, true);
                };
                return MetadataSchema;
            })();
            Client.MetadataSchema = MetadataSchema;

            var Folder = (function () {
                function Folder() {
                }
                Folder.GetPermission = function (folderID, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Folder/GetPermission", CHAOS.Portal.Client.HttpMethod.Get, { folderID: folderID }, true);
                };

                Folder.SetPermission = function (userGuid, groupGuid, folderID, permission, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Folder/SetPermission", CHAOS.Portal.Client.HttpMethod.Get, { userGuid: userGuid, groupGuid: groupGuid, folderID: folderID, permission: permission }, true);
                };

                Folder.Get = function (id, folderTypeID, parentID, permission, serviceCaller) {
                    if (typeof id === "undefined") { id = null; }
                    if (typeof folderTypeID === "undefined") { folderTypeID = null; }
                    if (typeof parentID === "undefined") { parentID = null; }
                    if (typeof permission === "undefined") { permission = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Folder/Get", CHAOS.Portal.Client.HttpMethod.Get, { id: id, folderTypeID: folderTypeID, parentID: parentID, permission: permission }, true);
                };

                Folder.Delete = function (id, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Folder/Delete", CHAOS.Portal.Client.HttpMethod.Get, { id: id }, true);
                };

                Folder.Update = function (id, newTitle, newParentID, newFolderTypeID, serviceCaller) {
                    if (typeof newParentID === "undefined") { newParentID = null; }
                    if (typeof newFolderTypeID === "undefined") { newFolderTypeID = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Folder/Update", CHAOS.Portal.Client.HttpMethod.Get, { id: id, newTitle: newTitle, newFolderTypeID: newFolderTypeID, newParentID: newParentID }, true);
                };

                Folder.Create = function (subscriptionGuid, title, parentID, folderTypeID, serviceCaller) {
                    if (typeof parentID === "undefined") { parentID = null; }
                    if (typeof folderTypeID === "undefined") { folderTypeID = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Folder/Create", CHAOS.Portal.Client.HttpMethod.Get, { subscriptionGuid: subscriptionGuid, title: title, parentID: parentID, folderTypeID: folderTypeID }, true);
                };
                return Folder;
            })();
            Client.Folder = Folder;

            var FolderType = (function () {
                function FolderType() {
                }
                FolderType.Get = function (name, serviceCaller) {
                    if (typeof name === "undefined") { name = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("FolderType/Get", CHAOS.Portal.Client.HttpMethod.Get, { name: name }, true);
                };
                return FolderType;
            })();
            Client.FolderType = FolderType;

            var Format = (function () {
                function Format() {
                }
                Format.Get = function (name, serviceCaller) {
                    if (typeof name === "undefined") { name = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Format/Get", CHAOS.Portal.Client.HttpMethod.Get, { name: name }, true);
                };
                return Format;
            })();
            Client.Format = Format;

            var FormatType = (function () {
                function FormatType() {
                }
                FormatType.Get = function (name, serviceCaller) {
                    if (typeof name === "undefined") { name = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("FormatType/Get", CHAOS.Portal.Client.HttpMethod.Get, { name: name }, true);
                };
                return FormatType;
            })();
            Client.FormatType = FormatType;

            var Language = (function () {
                function Language() {
                }
                Language.Get = function (name, languageCode, serviceCaller) {
                    if (typeof name === "undefined") { name = null; }
                    if (typeof languageCode === "undefined") { languageCode = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Language/Get", CHAOS.Portal.Client.HttpMethod.Get, { name: name, languageCode: languageCode }, true);
                };
                return Language;
            })();
            Client.Language = Language;

            var Object = (function () {
                function Object() {
                }
                Object.Create = function (guid, objectTypeID, folderID, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Object/Create", CHAOS.Portal.Client.HttpMethod.Get, { guid: guid, objectTypeID: objectTypeID, folderID: folderID }, true);
                };

                Object.Get = function (objectGuids, accessPointGuid, includeMetadata, includeFiles, includeObjectRelations, includeFolders, includeAccessPoints, pageSize, pageIndex, serviceCaller) {
                    if (typeof accessPointGuid === "undefined") { accessPointGuid = null; }
                    if (typeof includeMetadata === "undefined") { includeMetadata = false; }
                    if (typeof includeFiles === "undefined") { includeFiles = false; }
                    if (typeof includeObjectRelations === "undefined") { includeObjectRelations = false; }
                    if (typeof includeFolders === "undefined") { includeFolders = false; }
                    if (typeof includeAccessPoints === "undefined") { includeAccessPoints = false; }
                    if (typeof pageSize === "undefined") { pageSize = 10; }
                    if (typeof pageIndex === "undefined") { pageIndex = 0; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Object/Get", CHAOS.Portal.Client.HttpMethod.Get, { objectGuids: objectGuids.join(), accessPointGuid: accessPointGuid, includeMetadata: includeMetadata, includeFiles: includeFiles, includeObjectRelations: includeObjectRelations, includeFolders: includeFolders, includeAccessPoints: includeAccessPoints, pageSize: pageSize, pageIndex: pageIndex }, true);
                };

                Object.SetPublishSettings = function (objectGUID, accessPointGUID, startDate, endDate, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Object/SetPublishSettings", CHAOS.Portal.Client.HttpMethod.Get, { objectGUID: objectGUID, accessPointGUID: accessPointGUID, startDate: startDate, endDate: endDate }, true);
                };
                return Object;
            })();
            Client.Object = Object;

            var ObjectRelation = (function () {
                function ObjectRelation() {
                }
                ObjectRelation.Set = function (object1Guid, object2Guid, objectRelationTypeID, sequence, metadataGuid, metadataSchemaGuid, languageCode, metadataXml, serviceCaller) {
                    if (typeof sequence === "undefined") { sequence = null; }
                    if (typeof metadataGuid === "undefined") { metadataGuid = null; }
                    if (typeof metadataSchemaGuid === "undefined") { metadataSchemaGuid = null; }
                    if (typeof languageCode === "undefined") { languageCode = null; }
                    if (typeof metadataXml === "undefined") { metadataXml = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("ObjectRelation/Set", CHAOS.Portal.Client.HttpMethod.Post, { object1Guid: object1Guid, object2Guid: object2Guid, objectRelationTypeID: objectRelationTypeID, sequence: sequence, metadataGuid: metadataGuid, metadataSchemaGuid: metadataSchemaGuid, languageCode: languageCode, metadataXml: metadataXml }, true);
                };

                ObjectRelation.Delete = function (object1Guid, object2Guid, objectRelationTypeID, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("ObjectRelation/Delete", CHAOS.Portal.Client.HttpMethod.Get, { object1Guid: object1Guid, object2Guid: object2Guid, objectRelationTypeID: objectRelationTypeID }, true);
                };
                return ObjectRelation;
            })();
            Client.ObjectRelation = ObjectRelation;

            var ObjectRelationType = (function () {
                function ObjectRelationType() {
                }
                ObjectRelationType.Get = function (value, serviceCaller) {
                    if (typeof value === "undefined") { value = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("ObjectRelationType/Get", CHAOS.Portal.Client.HttpMethod.Get, { value: value }, true);
                };
                return ObjectRelationType;
            })();
            Client.ObjectRelationType = ObjectRelationType;

            var Metadata = (function () {
                function Metadata() {
                }
                Metadata.Set = function (objectGuid, metadataSchemaGuid, languageCode, revisionID, metadataXml, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Metadata/Set", CHAOS.Portal.Client.HttpMethod.Post, { objectGuid: objectGuid, metadataSchemaGuid: metadataSchemaGuid, languageCode: languageCode, revisionID: revisionID, metadataXml: metadataXml }, true);
                };
                return Metadata;
            })();
            Client.Metadata = Metadata;

            var ObjectType = (function () {
                function ObjectType() {
                }
                ObjectType.Get = function (serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("ObjectType/Get", CHAOS.Portal.Client.HttpMethod.Get, null, true);
                };

                ObjectType.Set = function (name, id, serviceCaller) {
                    if (typeof id === "undefined") { id = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("ObjectType/Set", CHAOS.Portal.Client.HttpMethod.Get, { id: id, name: name }, true);
                };

                ObjectType.Delete = function (id, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("ObjectType/Delete", CHAOS.Portal.Client.HttpMethod.Get, { id: id }, true);
                };
                return ObjectType;
            })();
            Client.ObjectType = ObjectType;

            var UserManagement = (function () {
                function UserManagement() {
                }
                UserManagement.GetUserFolder = function (userGuid, createIfMissing, serviceCaller) {
                    if (typeof userGuid === "undefined") { userGuid = null; }
                    if (typeof createIfMissing === "undefined") { createIfMissing = true; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("UserManagement/GetUserFolder", CHAOS.Portal.Client.HttpMethod.Get, { userGuid: userGuid, createIfMissing: createIfMissing }, true);
                };

                UserManagement.GetUserObject = function (userGuid, createIfMissing, includeMetata, includeFiles, serviceCaller) {
                    if (typeof userGuid === "undefined") { userGuid = null; }
                    if (typeof createIfMissing === "undefined") { createIfMissing = true; }
                    if (typeof includeMetata === "undefined") { includeMetata = false; }
                    if (typeof includeFiles === "undefined") { includeFiles = false; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("UserManagement/GetUserObject", CHAOS.Portal.Client.HttpMethod.Get, { userGuid: userGuid, createIfMissing: createIfMissing, includeMetata: includeMetata, includeFiles: includeFiles }, true);
                };
                return UserManagement;
            })();
            Client.UserManagement = UserManagement;

            var UserProfile = (function () {
                function UserProfile() {
                }
                UserProfile.Get = function (metadataSchemaGuid, userGuid, serviceCaller) {
                    if (typeof userGuid === "undefined") { userGuid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("UserProfile/Get", CHAOS.Portal.Client.HttpMethod.Get, { metadataSchemaGuid: metadataSchemaGuid, userGuid: userGuid }, true);
                };

                UserProfile.Set = function (metadataSchemaGuid, metadata, userGuid, serviceCaller) {
                    if (typeof userGuid === "undefined") { userGuid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("UserProfile/Set", CHAOS.Portal.Client.HttpMethod.Post, { metadataSchemaGuid: metadataSchemaGuid, metadata: metadata, userGuid: userGuid }, true);
                };
                return UserProfile;
            })();
            Client.UserProfile = UserProfile;
        })(Portal.Client || (Portal.Client = {}));
        var Client = Portal.Client;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//# sourceMappingURL=MCMExtensions.js.map
