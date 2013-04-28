module CHAOS.Portal.Client {
    interface IPortalClient {
        GetServicePath(): string;
        GetCurrentSession(): ISession;
        HasSession(): bool;
        IsAuthenticated(): bool;
        SessionAcquired(): IEvent;
        SessionAuthenticated(): IEvent;
        ClientGuid: string;
    }
    interface ISession {
        Guid: string;
        UserGuid: string;
        DateCreated: number;
        DateModified: number;
        FullName: string;
    }
    interface IServiceCaller {
        CallService(path: string, httpMethod: string, parameters: {
                [index: string]: any;
            }, requiresSession: bool): ICallState;
        UpdateSession(session: ISession): void;
        SetSessionAuthenticated(type: string): void;
    }
    interface ICallState {
        WithCallback(callback: (response: IPortalResponse) => void): ICallState;
        WithCallback(callback: (response: IPortalResponse) => void, context: any): ICallState;
        WithCallbackAndToken(callback: (response: IPortalResponse, token: any) => void, token: any): ICallState;
        WithCallbackAndToken(callback: (response: IPortalResponse, token: any) => void, token: any, context: any): ICallState;
    }
    interface IPortalResponse {
        Header: IHeader;
        Result: IPortalResult;
        Error: IError;
    }
    interface IHeader {
        Duration: number;
    }
    interface IPortalResult {
        Count: number;
        TotalCount: number;
        Results: any[];
    }
    interface IError {
        Fullname: string;
        Message: string;
        Stacktrace: string;
        InnerException: IError;
    }
    interface IEvent {
        Add(handler: (any: any) => void): void;
        Remove(handler: (any: any) => void): void;
    }
    class HttpMethod {
        static Get(): string;
        static Post(): string;
    }
}
module CHAOS.Portal.Client {
    class PortalClient implements IPortalClient, IServiceCaller {
        static GetClientVersion(): string;
        private static GetProtocolVersion();
        private _servicePath;
        private _currentSession;
        private _authenticationType;
        private _sessionAcquired;
        private _sessionAuthenticated;
        public GetServicePath(): string;
        public GetCurrentSession(): ISession;
        public HasSession(): bool;
        public IsAuthenticated(): bool;
        public SessionAcquired(): IEvent;
        public SessionAuthenticated(): IEvent;
        public ClientGuid: string;
        constructor(servicePath: string, clientGuid?: string);
        public CallService(path: string, httpMethod: string, parameters?: {
                [index: string]: any;
            }, requiresSession?: bool): ICallState;
        public UpdateSession(session: ISession): void;
        public SetSessionAuthenticated(type: string): void;
    }
}
module CHAOS.Portal.Client {
    class Session {
        static Create(serviceCaller?: IServiceCaller): ICallState;
    }
    class EmailPassword {
        static AuthenticationType(): string;
        static Login(email: string, password: string, serviceCaller?: IServiceCaller): ICallState;
    }
    class SecureCookie {
        static AuthenticationType(): string;
        static Create(serviceCaller?: IServiceCaller): ICallState;
        static Login(guid: string, passwordGuid: string, serviceCaller?: IServiceCaller): ICallState;
    }
    class User {
        static Get(serviceCaller?: IServiceCaller): ICallState;
        static GetCurrent(serviceCaller?: IServiceCaller): ICallState;
    }
    class Group {
        static Get(serviceCaller?: IServiceCaller): ICallState;
        static Create(name: string, systemPermission: number, serviceCaller?: IServiceCaller): ICallState;
        static Update(guid: string, newName: string, newSystemPermission?: number, serviceCaller?: IServiceCaller): ICallState;
        static Delete(guid: string, serviceCaller?: IServiceCaller): ICallState;
    }
    class View {
        static Get(view: string, query?: string, sort?: string, pageIndex?: number, pageSize?: number, serviceCaller?: IServiceCaller): ICallState;
        static List(serviceCaller?: IServiceCaller): ICallState;
    }
    function Initialize(servicePath: string, clientGUID?: string, autoCreateSession?: bool): IPortalClient;
    class ServiceCallerService {
        private static _defaultCaller;
        static GetDefaultCaller(): IServiceCaller;
        static SetDefaultCaller(value: IServiceCaller): void;
    }
}
module CHAOS.Portal.Client {
    class MetadataSchema {
        static Get(metadataSchemaGUID?: string, serviceCaller?: IServiceCaller): ICallState;
        static Create(name: string, schemaXml: string, guid?: string, serviceCaller?: IServiceCaller): ICallState;
        static Update(name: string, schemaXml: string, guid: string, serviceCaller?: IServiceCaller): ICallState;
        static Delete(guid: string, serviceCaller?: IServiceCaller): ICallState;
        static HasPermissionToMetadataSchema(guid: string, MetadataSchemaPermission: number, serviceCaller?: IServiceCaller): ICallState;
    }
    class Folder {
        static Get(id?: number, folderTypeID?: number, parentID?: number, serviceCaller?: IServiceCaller): ICallState;
    }
    class FolderType {
        static Get(name?: string, serviceCaller?: IServiceCaller): ICallState;
    }
    class Format {
        static Get(name?: string, serviceCaller?: IServiceCaller): ICallState;
    }
    class FormatType {
        static Get(name?: string, serviceCaller?: IServiceCaller): ICallState;
    }
    class Language {
        static Get(name?: string, languageCode?: string, serviceCaller?: IServiceCaller): ICallState;
    }
    class Object {
        static Create(guid: string, objectTypeID: number, folderID: number, serviceCaller?: IServiceCaller): ICallState;
        static Get(query?: string, sort?: string, accessPointGUID?: string, pageIndex?: number, pageSize?: number, includeMetadata?: bool, includeFiles?: bool, includeObjectRelations?: bool, includeAccessPoints?: bool, serviceCaller?: IServiceCaller): ICallState;
        static GetByFolderID(folderID: number, includeChildFolders?: bool, sort?: string, accessPointGUID?: string, pageIndex?: number, pageSize?: number, includeMetadata?: bool, includeFiles?: bool, includeObjectRelations?: bool, includeAccessPoints?: bool, serviceCaller?: IServiceCaller): ICallState;
        static GetByObjectGUID(objectGUID: string, accessPointGUID?: string, includeMetadata?: bool, includeFiles?: bool, includeObjectRelations?: bool, includeAccessPoints?: bool, serviceCaller?: IServiceCaller): ICallState;
        static SetPublishSettings(objectGUID: string, accessPointGUID: string, startDate: Date, endDate: Date, serviceCaller?: IServiceCaller): ICallState;
    }
    class ObjectRelationType {
        static Get(value?: string, serviceCaller?: IServiceCaller): ICallState;
    }
    class Metadata {
        static Set(objectGUID: string, metadataSchemaGUID: string, languageCode: string, revisionID: number, metadataXML: string, serviceCaller?: IServiceCaller): ICallState;
    }
    class ObjectType {
        static Get(serviceCaller?: IServiceCaller): ICallState;
        static Set(name: string, id?: number, serviceCaller?: IServiceCaller): ICallState;
        static Delete(id: number, serviceCaller?: IServiceCaller): ICallState;
    }
}
module CHAOS.Portal.Client {
    class SecureCookieHelper {
        private static COOKIE_LIFE_TIME_DAYS;
        static DoesCookieExist(): bool;
        static Login(callback?: (success: bool) => void, serviceCaller?: IServiceCaller): void;
        static Create(serviceCaller?: IServiceCaller): void;
        static Clear(): void;
        private static GetCookie();
        private static SetCookie(guid, passwordGuid, expireInDays);
    }
}
