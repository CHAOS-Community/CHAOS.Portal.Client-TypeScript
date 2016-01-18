var CHAOS;
(function (CHAOS) {
    var Portal;
    (function (Portal) {
        var Client;
        (function (Client) {
            var MetadataSchema = (function () {
                function MetadataSchema() {
                }
                MetadataSchema.Get = function (guid, serviceCaller) {
                    if (guid === void 0) { guid = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("MetadataSchema/Get", CHAOS.Portal.Client.HttpMethod.Get, { guid: guid }, true);
                };
                MetadataSchema.Create = function (name, schemaXml, guid, serviceCaller) {
                    if (guid === void 0) { guid = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("MetadataSchema/Create", CHAOS.Portal.Client.HttpMethod.Post, { name: name, schemaXml: schemaXml, guid: guid }, true);
                };
                MetadataSchema.Update = function (name, schemaXml, guid, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("MetadataSchema/Update", CHAOS.Portal.Client.HttpMethod.Post, { name: name, schemaXml: schemaXml, guid: guid }, true);
                };
                MetadataSchema.Delete = function (guid, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("MetadataSchema/Delete", CHAOS.Portal.Client.HttpMethod.Get, { guid: guid }, true);
                };
                MetadataSchema.HasPermissionToMetadataSchema = function (guid, permission, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
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
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Folder/GetPermission", CHAOS.Portal.Client.HttpMethod.Get, { folderID: folderID }, true);
                };
                Folder.SetPermission = function (userGuid, groupGuid, folderID, permission, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Folder/SetPermission", CHAOS.Portal.Client.HttpMethod.Get, { userGuid: userGuid, groupGuid: groupGuid, folderID: folderID, permission: permission }, true);
                };
                Folder.Get = function (id, folderTypeID, parentID, permission, serviceCaller) {
                    if (id === void 0) { id = null; }
                    if (folderTypeID === void 0) { folderTypeID = null; }
                    if (parentID === void 0) { parentID = null; }
                    if (permission === void 0) { permission = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Folder/Get", CHAOS.Portal.Client.HttpMethod.Get, { id: id, folderTypeID: folderTypeID, parentID: parentID, permission: permission }, true);
                };
                Folder.Delete = function (id, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Folder/Delete", CHAOS.Portal.Client.HttpMethod.Get, { id: id }, true);
                };
                Folder.Update = function (id, newTitle, newParentID, newFolderTypeID, serviceCaller) {
                    if (newParentID === void 0) { newParentID = null; }
                    if (newFolderTypeID === void 0) { newFolderTypeID = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Folder/Update", CHAOS.Portal.Client.HttpMethod.Get, { id: id, newTitle: newTitle, newFolderTypeID: newFolderTypeID, newParentID: newParentID }, true);
                };
                Folder.Create = function (subscriptionGuid, title, parentID, folderTypeID, serviceCaller) {
                    if (parentID === void 0) { parentID = null; }
                    if (folderTypeID === void 0) { folderTypeID = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
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
                    if (name === void 0) { name = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
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
                    if (name === void 0) { name = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
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
                    if (name === void 0) { name = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
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
                    if (name === void 0) { name = null; }
                    if (languageCode === void 0) { languageCode = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Language/Get", CHAOS.Portal.Client.HttpMethod.Get, { name: name, languageCode: languageCode }, true);
                };
                return Language;
            })();
            Client.Language = Language;
            var Link = (function () {
                function Link() {
                }
                Link.Create = function (objectGuid, folderID, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Link/Create", CHAOS.Portal.Client.HttpMethod.Get, { objectGuid: objectGuid, folderID: folderID }, true);
                };
                Link.Update = function (objectGuid, folderID, newFolderID, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Link/Update", CHAOS.Portal.Client.HttpMethod.Get, { objectGuid: objectGuid, folderID: folderID, newFolderID: newFolderID }, true);
                };
                Link.Delete = function (objectGuid, folderID, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Link/Delete", CHAOS.Portal.Client.HttpMethod.Get, { objectGuid: objectGuid, folderID: folderID }, true);
                };
                return Link;
            })();
            Client.Link = Link;
            var Object = (function () {
                function Object() {
                }
                Object.Create = function (guid, objectTypeID, folderID, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Object/Create", CHAOS.Portal.Client.HttpMethod.Get, { guid: guid, objectTypeID: objectTypeID, folderID: folderID }, true);
                };
                Object.Get = function (objectGuids, accessPointGuid, includeMetadata, includeFiles, includeObjectRelations, includeFolders, includeAccessPoints, pageSize, pageIndex, serviceCaller) {
                    if (accessPointGuid === void 0) { accessPointGuid = null; }
                    if (includeMetadata === void 0) { includeMetadata = false; }
                    if (includeFiles === void 0) { includeFiles = false; }
                    if (includeObjectRelations === void 0) { includeObjectRelations = false; }
                    if (includeFolders === void 0) { includeFolders = false; }
                    if (includeAccessPoints === void 0) { includeAccessPoints = false; }
                    if (pageSize === void 0) { pageSize = 10; }
                    if (pageIndex === void 0) { pageIndex = 0; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Object/Get", CHAOS.Portal.Client.HttpMethod.Get, { objectGuids: objectGuids.join(), accessPointGuid: accessPointGuid, includeMetadata: includeMetadata, includeFiles: includeFiles, includeObjectRelations: includeObjectRelations, includeFolders: includeFolders, includeAccessPoints: includeAccessPoints, pageSize: pageSize, pageIndex: pageIndex }, true);
                };
                Object.SetPublishSettings = function (objectGuid, accessPointGuid, startDate, endDate, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("Object/SetPublishSettings", CHAOS.Portal.Client.HttpMethod.Get, { objectGuid: objectGuid, accessPointGuid: accessPointGuid, startDate: startDate, endDate: endDate }, true);
                };
                return Object;
            })();
            Client.Object = Object;
            var ObjectRelation = (function () {
                function ObjectRelation() {
                }
                ObjectRelation.Set = function (object1Guid, object2Guid, objectRelationTypeID, sequence, metadataGuid, metadataSchemaGuid, languageCode, metadataXml, serviceCaller) {
                    if (sequence === void 0) { sequence = null; }
                    if (metadataGuid === void 0) { metadataGuid = null; }
                    if (metadataSchemaGuid === void 0) { metadataSchemaGuid = null; }
                    if (languageCode === void 0) { languageCode = null; }
                    if (metadataXml === void 0) { metadataXml = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("ObjectRelation/Set", CHAOS.Portal.Client.HttpMethod.Post, { object1Guid: object1Guid, object2Guid: object2Guid, objectRelationTypeID: objectRelationTypeID, sequence: sequence, metadataGuid: metadataGuid, metadataSchemaGuid: metadataSchemaGuid, languageCode: languageCode, metadataXml: metadataXml }, true);
                };
                ObjectRelation.Delete = function (object1Guid, object2Guid, objectRelationTypeID, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
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
                    if (value === void 0) { value = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
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
                    if (serviceCaller === void 0) { serviceCaller = null; }
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
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("ObjectType/Get", CHAOS.Portal.Client.HttpMethod.Get, null, true);
                };
                ObjectType.Set = function (name, id, serviceCaller) {
                    if (id === void 0) { id = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("ObjectType/Set", CHAOS.Portal.Client.HttpMethod.Get, { id: id, name: name }, true);
                };
                ObjectType.Delete = function (id, serviceCaller) {
                    if (serviceCaller === void 0) { serviceCaller = null; }
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
                    if (userGuid === void 0) { userGuid = null; }
                    if (createIfMissing === void 0) { createIfMissing = true; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("UserManagement/GetUserFolder", CHAOS.Portal.Client.HttpMethod.Get, { userGuid: userGuid, createIfMissing: createIfMissing }, true);
                };
                UserManagement.GetUserObject = function (userGuid, createIfMissing, includeMetata, includeFiles, serviceCaller) {
                    if (userGuid === void 0) { userGuid = null; }
                    if (createIfMissing === void 0) { createIfMissing = true; }
                    if (includeMetata === void 0) { includeMetata = false; }
                    if (includeFiles === void 0) { includeFiles = false; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
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
                    if (userGuid === void 0) { userGuid = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("UserProfile/Get", CHAOS.Portal.Client.HttpMethod.Get, { metadataSchemaGuid: metadataSchemaGuid, userGuid: userGuid }, true);
                };
                UserProfile.Set = function (metadataSchemaGuid, metadata, userGuid, serviceCaller) {
                    if (userGuid === void 0) { userGuid = null; }
                    if (serviceCaller === void 0) { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
                    return serviceCaller.CallService("UserProfile/Set", CHAOS.Portal.Client.HttpMethod.Post, { metadataSchemaGuid: metadataSchemaGuid, metadata: metadata, userGuid: userGuid }, true);
                };
                return UserProfile;
            })();
            Client.UserProfile = UserProfile;
        })(Client = Portal.Client || (Portal.Client = {}));
    })(Portal = CHAOS.Portal || (CHAOS.Portal = {}));
})(CHAOS || (CHAOS = {}));
