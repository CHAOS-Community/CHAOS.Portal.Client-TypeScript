declare module CHAOS.Portal.Client {
    class EmailPassword {
        static AuthenticationType(): string;
        static Login(email: string, password: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static SetPassword(userGuid: string, newPassword: string, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class SecureCookie {
        static AuthenticationType(): string;
        static Create(serviceCaller?: IServiceCaller): ICallState<any>;
        static Login(guid: string, passwordGuid: string, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class Facebook {
        static AuthenticationType(): string;
        static Login(signedRequest: string, userAccessToken: string, serviceCaller?: IServiceCaller): ICallState<ISession>;
    }
    class AuthKey {
        static AuthenticationType(): string;
        static Create(name: string, serviceCaller?: IServiceCaller): ICallState<IAuthKey>;
        static Login(token: string, serviceCaller?: IServiceCaller): ICallState<ISession>;
        static Get(serviceCaller?: IServiceCaller): ICallState<IAuthKey>;
        static Delete(name: string, serviceCaller?: IServiceCaller): ICallState<IAuthKey>;
    }
    class OAuth {
        static AuthenticationType(): string;
        static GetLoginEndPoint(callbackUrl: string, serviceCaller?: IServiceCaller): ICallState<ILoginEndPoint>;
        static ProcessLogin(callbackUrl: string, responseUrl: string, stateCode: string, serviceCaller?: IServiceCaller): ICallState<ISession>;
    }
    interface ILoginEndPoint {
        Uri: string;
        StateCode: string;
    }
    interface IAuthKey {
        Name: string;
        Token: string;
        UserGuid: string;
    }
}
declare module CHAOS.Portal.Client {
    interface IPortalClient {
        GetServicePath(): string;
        GetCurrentSession(): ISession;
        HasSession(): boolean;
        IsAuthenticated(): boolean;
        AuthenticationType(): string;
        SessionAcquired(): IEvent<ISession>;
        SessionAuthenticated(): IEvent<string>;
        SetCallHandler(handler: ICallHandler): void;
        ClientGuid: string;
    }
    interface IServiceCaller {
        CallService<T>(path: string, method?: HttpMethod, parameters?: {
            [index: string]: any;
        }, requiresSession?: boolean): ICallState<T>;
        GetServiceCallUri(path: string, parameters?: {
            [index: string]: any;
        }, requiresSession?: boolean, format?: string): string;
        HasSession(): boolean;
        GetCurrentSession(): ISession;
        GetServicePath(): string;
        UpdateSession(session: ISession): void;
        SetSessionAuthenticated(type: string, userGuid?: string, sessionDateModified?: number): void;
    }
    interface ICallState<T> {
        WithCallback(callback: (response: IPortalResponse<T>) => void): ICallState<T>;
        WithCallback(callback: (response: IPortalResponse<T>) => void, context: any): ICallState<T>;
        WithCallbackAndToken(callback: (response: IPortalResponse<T>, token: any) => void, token: any): ICallState<T>;
        WithCallbackAndToken(callback: (response: IPortalResponse<T>, token: any) => void, token: any, context: any): ICallState<T>;
        TransferProgressChanged(): IEvent<ITransferProgress>;
    }
    interface ICallHandler {
        ProcessResponse<T>(response: IPortalResponse<T>, recaller: (resetSession: boolean) => void): boolean;
    }
    interface ISession {
        Guid: string;
        UserGuid: string;
        DateCreated: number;
        DateModified: number;
    }
    interface IPortalResponse<T> {
        Header: IHeader;
        Body: IPortalResult<T>;
        Error: IError;
    }
    interface IHeader {
        Duration: number;
    }
    interface IPortalResult<T> {
        Count: number;
        TotalCount: number;
        Results: T[];
    }
    interface IError {
        Fullname: string;
        Message: string;
        Stacktrace: string;
        InnerException: IError;
    }
    interface IEvent<T> {
        Add(handler: (data: T) => void): void;
        Remove(handler: (data: T) => void): void;
    }
    interface ITransferProgress {
        BytesTransfered: number;
        TotalBytes: number;
        TotalBytesIsKnown: boolean;
    }
    enum HttpMethod {
        Get = 0,
        Post = 1,
    }
}
declare module CHAOS.Portal.Client {
    class MetadataSchema {
        static Get(guid?: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static Create(name: string, schemaXml: string, guid?: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static Update(name: string, schemaXml: string, guid: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static Delete(guid: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static HasPermissionToMetadataSchema(guid: string, permission: number, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class Folder {
        static GetPermission(folderID: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static SetPermission(userGuid: string, groupGuid: string, folderID: number, permission: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static Get(id?: number, folderTypeID?: number, parentID?: number, permission?: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static Delete(id: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static Update(id: number, newTitle: string, newParentID?: number, newFolderTypeID?: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static Create(subscriptionGuid: string, title: string, parentID?: number, folderTypeID?: number, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class FolderType {
        static Get(name?: string, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class Format {
        static Get(name?: string, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class FormatType {
        static Get(name?: string, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class Language {
        static Get(name?: string, languageCode?: string, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class Link {
        static Create(objectGuid: string, folderID: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static Update(objectGuid: string, folderID: number, newFolderID: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static Delete(objectGuid: string, folderID: number, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class Object {
        static Create(guid: string, objectTypeID: number, folderID: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static Get(objectGuids: string[], accessPointGuid?: string, includeMetadata?: boolean, includeFiles?: boolean, includeObjectRelations?: boolean, includeFolders?: boolean, includeAccessPoints?: boolean, pageSize?: number, pageIndex?: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static SetPublishSettings(objectGuid: string, accessPointGuid: string, startDate: Date, endDate: Date, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class ObjectRelation {
        static Set(object1Guid: string, object2Guid: string, objectRelationTypeID: number, sequence?: number, metadataGuid?: string, metadataSchemaGuid?: string, languageCode?: string, metadataXml?: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static Delete(object1Guid: string, object2Guid: string, objectRelationTypeID: number, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class ObjectRelationType {
        static Get(value?: string, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class Metadata {
        static Set(objectGuid: string, metadataSchemaGuid: string, languageCode: string, revisionID: number, metadataXml: string, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class ObjectType {
        static Get(serviceCaller?: IServiceCaller): ICallState<any>;
        static Set(name: string, id?: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static Delete(id: number, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class UserManagement {
        static GetUserFolder(userGuid?: string, createIfMissing?: boolean, serviceCaller?: IServiceCaller): ICallState<any>;
        static GetUserObject(userGuid?: string, createIfMissing?: boolean, includeMetata?: boolean, includeFiles?: boolean, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class UserProfile {
        static Get(metadataSchemaGuid: string, userGuid?: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static Set(metadataSchemaGuid: string, metadata: string, userGuid?: string, serviceCaller?: IServiceCaller): ICallState<any>;
    }
}
declare module CHAOS.Portal.Client {
    class PortalClient implements IPortalClient, IServiceCaller {
        static GetSessionParameterName(): string;
        static GetClientVersion(): string;
        private static GetProtocolVersion();
        private _servicePath;
        private _currentSession;
        private _authenticationType;
        private _sessionAcquired;
        private _sessionAuthenticated;
        private _callHandler;
        public GetServicePath(): string;
        public GetCurrentSession(): ISession;
        public HasSession(): boolean;
        public IsAuthenticated(): boolean;
        public AuthenticationType(): string;
        public SessionAcquired(): IEvent<ISession>;
        public SessionAuthenticated(): IEvent<string>;
        public ClientGuid: string;
        constructor(servicePath: string, clientGuid?: string);
        public CallService<T>(path: string, method?: HttpMethod, parameters?: {
            [index: string]: any;
        }, requiresSession?: boolean): ICallState<T>;
        public GetServiceCallUri(path: string, parameters?: {
            [index: string]: any;
        }, requiresSession?: boolean, format?: string): string;
        public SetCallHandler(handler: ICallHandler): void;
        private GetPathToExtension(path);
        private AddSessionToParameters(parameters, path, method?);
        public UpdateSession(session: ISession): void;
        public SetSessionAuthenticated(type: string, userGuid?: string, sessionDateModified?: number): void;
    }
}
interface Window {
    [index: string]: any;
}
declare module CHAOS.Portal.Client {
    class Session {
        static Create(serviceCaller?: IServiceCaller): ICallState<ISession>;
        static Get(serviceCaller?: IServiceCaller): ICallState<ISession>;
        static Update(serviceCaller?: IServiceCaller): ICallState<ISession>;
        static Delete(serviceCaller?: IServiceCaller): ICallState<ISession>;
    }
    class User {
        static Create(guid: string, email: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static Update(guid: string, email: string, permissons?: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static Delete(guid: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static Get(guid?: string, groupGuid?: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static GetCurrent(serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class Group {
        static Get(guid?: string, userGuid?: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static Create(name: string, systemPermission: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static Update(guid: string, newName: string, newSystemPermission?: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static Delete(guid: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static AddUser(guid: string, userGuid: string, permissions: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static RemoveUser(guid: string, userGuid: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static UpdateUserPermissions(guid: string, userGuid: string, permissions: number, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class View {
        static Get(view: string, query?: string, sort?: string, filter?: string, pageIndex?: number, pageSize?: number, serviceCaller?: IServiceCaller): ICallState<any>;
        static List(serviceCaller?: IServiceCaller): ICallState<any>;
    }
    class ClientSettings {
        static Get(guid: string, serviceCaller?: IServiceCaller): ICallState<any>;
        static Set(guid: string, name: string, settings: string, serviceCaller?: IServiceCaller): ICallState<any>;
    }
    function Initialize(servicePath: string, clientGUID?: string, autoCreateSession?: boolean): IPortalClient;
    class ServiceCallerService {
        private static _defaultCaller;
        static GetDefaultCaller(): IServiceCaller;
        static SetDefaultCaller(value: IServiceCaller): void;
    }
}
declare module CHAOS.Portal.Client {
    class SecureCookieHelper {
        private static COOKIE_LIFE_TIME_DAYS;
        static DoesCookieExist(): boolean;
        static Login(callback?: (success: boolean) => void, serviceCaller?: IServiceCaller): void;
        static Create(serviceCaller?: IServiceCaller): void;
        static Clear(): void;
        private static GetCookie();
        private static SetCookie(guid, passwordGuid, expireInDays);
    }
}
declare module CHAOS.Portal.Client {
    class Wayf {
        static AuthenticationType(): string;
        static LogIn(wayfServicePath: string, target: any, callback: (status: number) => void, callbackUrl?: string, serviceCaller?: IServiceCaller): void;
        static LogOut(wayfServicePath: string, target: any, callback: (status: number) => void, callbackUrl?: string, serviceCaller?: IServiceCaller): void;
        private static CallWayfService(wayfServicePath, wayfMethod, target, callback, callbackUrl?, serviceCaller?);
    }
}
