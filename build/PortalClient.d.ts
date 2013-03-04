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
        static GetProtocolVersion();
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
        constructor (servicePath: string, clientGuid?: string);
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
        static Login(guid: string, passwordGUID: string, serviceCaller?: IServiceCaller): ICallState;
    }
    class View {
        static Get(view: string, query?: string, sort?: string, pageIndex?: number, pageSize?: number, serviceCaller?: IServiceCaller): ICallState;
        static List(serviceCaller?: IServiceCaller): ICallState;
    }
    function Initialize(servicePath: string, clientGUID?: string, autoCreateSession?: bool): IPortalClient;
    class ServiceCallerService {
        static _defaultCaller;
        static GetDefaultCaller(): IServiceCaller;
        static SetDefaultCaller(value: IServiceCaller): void;
    }
}
module CHAOS.Portal.Client {
    class MetadataSchema {
        static Get(metadataSchemaGUID?: string, serviceCaller?: IServiceCaller): ICallState;
    }
    class Folder {
        static Get(id?: number, folderTypeID?: number, parentID?: number, serviceCaller?: IServiceCaller): ICallState;
    }
    class Object {
        static Create(guid: string, objectTypeID: number, folderID: number, serviceCaller?: IServiceCaller): ICallState;
        static Get(query?: string, sort?: string, accessPointGUID?: string, pageIndex?: number, pageSize?: number, includeMetadata?: bool, includeFiles?: bool, includeObjectRelations?: bool, includeAccessPoints?: bool, serviceCaller?: IServiceCaller): ICallState;
        static GetByFolderID(folderID: number, includeChildFolders?: bool, sort?: string, accessPointGUID?: string, pageIndex?: number, pageSize?: number, includeMetadata?: bool, includeFiles?: bool, includeObjectRelations?: bool, includeAccessPoints?: bool, serviceCaller?: IServiceCaller): ICallState;
        static GetByObjectGUID(objectGUID: string, accessPointGUID?: string, includeMetadata?: bool, includeFiles?: bool, includeObjectRelations?: bool, includeAccessPoints?: bool, serviceCaller?: IServiceCaller): ICallState;
        static SetPublishSettings(objectGUID: string, accessPointGUID: string, startDate: Date, endDate: Date, serviceCaller?: IServiceCaller): ICallState;
    }
    class Metadata {
        static Set(objectGUID: string, metadataSchemaGUID: string, languageCode: string, revisionID: number, metadataXML: string, serviceCaller?: IServiceCaller): ICallState;
    }
}
module CHAOS.Portal.Client {
    class SecureCookieHelper {
        static COOKIE_LIFE_TIME_DAYS;
        static DoesCookieExist(): bool;
        static Login(callback?: (success: bool) => void, serviceCaller?: IServiceCaller): void;
        static Create(serviceCaller?: IServiceCaller): void;
        static Clear(): void;
        static GetCookie();
        static SetCookie(guid, passwordGUID, expireInDays);
    }
}
