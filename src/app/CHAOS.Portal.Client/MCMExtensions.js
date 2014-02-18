var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Client) {
            var MetadataSchema = (function () {
                function MetadataSchema() {
                }
                MetadataSchema.Get = function (guid, serviceCaller) {
                    if (typeof guid === "undefined") { guid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("MetadataSchema/Get", 0 /* Get */, { guid: guid }, true);
                };

                MetadataSchema.Create = function (name, schemaXml, guid, serviceCaller) {
                    if (typeof guid === "undefined") { guid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("MetadataSchema/Create", 1 /* Post */, { name: name, schemaXml: schemaXml, guid: guid }, true);
                };

                MetadataSchema.Update = function (name, schemaXml, guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("MetadataSchema/Update", 1 /* Post */, { name: name, schemaXml: schemaXml, guid: guid }, true);
                };

                MetadataSchema.Delete = function (guid, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("MetadataSchema/Delete", 0 /* Get */, { guid: guid }, true);
                };

                MetadataSchema.HasPermissionToMetadataSchema = function (guid, permission, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("MetadataSchema/HasPermissionToMetadataSchema", 0 /* Get */, { guid: guid, permission: permission }, true);
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

                    return serviceCaller.CallService("Folder/GetPermission", 0 /* Get */, { folderID: folderID }, true);
                };

                Folder.SetPermission = function (userGuid, groupGuid, folderID, permission, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Folder/SetPermission", 0 /* Get */, { userGuid: userGuid, groupGuid: groupGuid, folderID: folderID, permission: permission }, true);
                };

                Folder.Get = function (id, folderTypeID, parentID, permission, serviceCaller) {
                    if (typeof id === "undefined") { id = null; }
                    if (typeof folderTypeID === "undefined") { folderTypeID = null; }
                    if (typeof parentID === "undefined") { parentID = null; }
                    if (typeof permission === "undefined") { permission = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Folder/Get", 0 /* Get */, { id: id, folderTypeID: folderTypeID, parentID: parentID, permission: permission }, true);
                };

                Folder.Delete = function (id, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Folder/Delete", 0 /* Get */, { id: id }, true);
                };

                Folder.Update = function (id, newTitle, newParentID, newFolderTypeID, serviceCaller) {
                    if (typeof newParentID === "undefined") { newParentID = null; }
                    if (typeof newFolderTypeID === "undefined") { newFolderTypeID = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Folder/Update", 0 /* Get */, { id: id, newTitle: newTitle, newFolderTypeID: newFolderTypeID, newParentID: newParentID }, true);
                };

                Folder.Create = function (subscriptionGuid, title, parentID, folderTypeID, serviceCaller) {
                    if (typeof parentID === "undefined") { parentID = null; }
                    if (typeof folderTypeID === "undefined") { folderTypeID = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Folder/Create", 0 /* Get */, { subscriptionGuid: subscriptionGuid, title: title, parentID: parentID, folderTypeID: folderTypeID }, true);
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

                    return serviceCaller.CallService("FolderType/Get", 0 /* Get */, { name: name }, true);
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

                    return serviceCaller.CallService("Format/Get", 0 /* Get */, { name: name }, true);
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

                    return serviceCaller.CallService("FormatType/Get", 0 /* Get */, { name: name }, true);
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

                    return serviceCaller.CallService("Language/Get", 0 /* Get */, { name: name, languageCode: languageCode }, true);
                };
                return Language;
            })();
            Client.Language = Language;

            var Link = (function () {
                function Link() {
                }
                Link.Create = function (objectGuid, folderID, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Link/Create", 0 /* Get */, { objectGuid: objectGuid, folderID: folderID }, true);
                };

                Link.Update = function (objectGuid, folderID, newFolderID, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Link/Update", 0 /* Get */, { objectGuid: objectGuid, folderID: folderID, newFolderID: newFolderID }, true);
                };

                Link.Delete = function (objectGuid, folderID, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Link/Delete", 0 /* Get */, { objectGuid: objectGuid, folderID: folderID }, true);
                };
                return Link;
            })();
            Client.Link = Link;

            var Object = (function () {
                function Object() {
                }
                Object.Create = function (guid, objectTypeID, folderID, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Object/Create", 0 /* Get */, { guid: guid, objectTypeID: objectTypeID, folderID: folderID }, true);
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

                    return serviceCaller.CallService("Object/Get", 0 /* Get */, { objectGuids: objectGuids.join(), accessPointGuid: accessPointGuid, includeMetadata: includeMetadata, includeFiles: includeFiles, includeObjectRelations: includeObjectRelations, includeFolders: includeFolders, includeAccessPoints: includeAccessPoints, pageSize: pageSize, pageIndex: pageIndex }, true);
                };

                Object.SetPublishSettings = function (objectGuid, accessPointGuid, startDate, endDate, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("Object/SetPublishSettings", 0 /* Get */, { objectGuid: objectGuid, accessPointGuid: accessPointGuid, startDate: startDate, endDate: endDate }, true);
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

                    return serviceCaller.CallService("ObjectRelation/Set", 1 /* Post */, { object1Guid: object1Guid, object2Guid: object2Guid, objectRelationTypeID: objectRelationTypeID, sequence: sequence, metadataGuid: metadataGuid, metadataSchemaGuid: metadataSchemaGuid, languageCode: languageCode, metadataXml: metadataXml }, true);
                };

                ObjectRelation.Delete = function (object1Guid, object2Guid, objectRelationTypeID, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("ObjectRelation/Delete", 0 /* Get */, { object1Guid: object1Guid, object2Guid: object2Guid, objectRelationTypeID: objectRelationTypeID }, true);
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

                    return serviceCaller.CallService("ObjectRelationType/Get", 0 /* Get */, { value: value }, true);
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

                    return serviceCaller.CallService("Metadata/Set", 1 /* Post */, { objectGuid: objectGuid, metadataSchemaGuid: metadataSchemaGuid, languageCode: languageCode, revisionID: revisionID, metadataXml: metadataXml }, true);
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

                    return serviceCaller.CallService("ObjectType/Get", 0 /* Get */, null, true);
                };

                ObjectType.Set = function (name, id, serviceCaller) {
                    if (typeof id === "undefined") { id = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("ObjectType/Set", 0 /* Get */, { id: id, name: name }, true);
                };

                ObjectType.Delete = function (id, serviceCaller) {
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("ObjectType/Delete", 0 /* Get */, { id: id }, true);
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

                    return serviceCaller.CallService("UserManagement/GetUserFolder", 0 /* Get */, { userGuid: userGuid, createIfMissing: createIfMissing }, true);
                };

                UserManagement.GetUserObject = function (userGuid, createIfMissing, includeMetata, includeFiles, serviceCaller) {
                    if (typeof userGuid === "undefined") { userGuid = null; }
                    if (typeof createIfMissing === "undefined") { createIfMissing = true; }
                    if (typeof includeMetata === "undefined") { includeMetata = false; }
                    if (typeof includeFiles === "undefined") { includeFiles = false; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("UserManagement/GetUserObject", 0 /* Get */, { userGuid: userGuid, createIfMissing: createIfMissing, includeMetata: includeMetata, includeFiles: includeFiles }, true);
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

                    return serviceCaller.CallService("UserProfile/Get", 0 /* Get */, { metadataSchemaGuid: metadataSchemaGuid, userGuid: userGuid }, true);
                };

                UserProfile.Set = function (metadataSchemaGuid, metadata, userGuid, serviceCaller) {
                    if (typeof userGuid === "undefined") { userGuid = null; }
                    if (typeof serviceCaller === "undefined") { serviceCaller = null; }
                    if (serviceCaller == null)
                        serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

                    return serviceCaller.CallService("UserProfile/Set", 1 /* Post */, { metadataSchemaGuid: metadataSchemaGuid, metadata: metadata, userGuid: userGuid }, true);
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
