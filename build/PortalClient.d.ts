module CHAOS.Portal.Client {
    interface IPortalClient {
        GetServicePath(): string;
        GetCurrentSession(): ISession;
        HasSession(): bool;
        IsAuthenticated(): bool;
        SessionAcquired(): IEvent;
        SessionAuthenticated(): IEvent;
        ClientGUID: string;
    }
    interface ISession {
        GUID: string;
        UserGUID: string;
        DateCreated: number;
        DateModified: number;
        FullName: string;
    }
    interface IServiceCaller {
        CallService(callback: (response: IPortalResponse) => void, path: string, httpMethod: string, parameters: {
            [index: string]: any;
        }, requiresSession: bool): void;
        UpdateSession(session: ISession): void;
        SetSessionAuthenticated(type: string): void;
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
        public ClientGUID: string;
        constructor (servicePath: string, clientGUID?: string);
        public CallService(callback: (response: IPortalResponse) => void, path: string, httpMethod: string, parameters?: {
            [index: string]: any;
        }, requiresSession?: bool): void;
        public UpdateSession(session: ISession): void;
        public SetSessionAuthenticated(type: string): void;
    }
}
module CHAOS.Portal.Client {
    class Session {
        static Create(callback?: (response: IPortalResponse) => void, serviceCaller?: IServiceCaller): void;
    }
    class EmailPassword {
        static AuthenticationType(): string;
        static Login(callback: (response: IPortalResponse) => void, email: string, password: string, serviceCaller?: IServiceCaller): void;
    }
    class SecureCookie {
        static AuthenticationType(): string;
        static Create(callback?: (response: IPortalResponse) => void, serviceCaller?: IServiceCaller): void;
        static Login(callback: (response: IPortalResponse) => void, guid: string, passwordGUID: string, serviceCaller?: IServiceCaller): void;
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
        static Get(callback?: (response: IPortalResponse) => void, metadataSchemaGUID?: string, serviceCaller?: IServiceCaller): void;
    }
    class Folder {
        static Get(callback?: (response: IPortalResponse) => void, id?: number, folderTypeID?: number, parentID?: number, serviceCaller?: IServiceCaller): void;
    }
    class Object {
        static Create(callback: (response: IPortalResponse) => void, guid: string, objectTypeID: number, folderID: number, serviceCaller?: IServiceCaller): void;
        static Get(callback?: (response: IPortalResponse) => void, query?: string, sort?: string, accessPointGUID?: string, pageIndex?: number, pageSize?: number, includeMetadata?: bool, includeFiles?: bool, includeObjectRelations?: bool, includeAccessPoints?: bool, serviceCaller?: IServiceCaller): void;
        static GetByFolderID(callback: (response: IPortalResponse) => void, folderID: number, includeChildFolders?: bool, sort?: string, accessPointGUID?: string, pageIndex?: number, pageSize?: number, includeMetadata?: bool, includeFiles?: bool, includeObjectRelations?: bool, includeAccessPoints?: bool, serviceCaller?: IServiceCaller): void;
        static GetByObjectGUID(callback: (response: IPortalResponse) => void, objectGUID: string, accessPointGUID?: string, includeMetadata?: bool, includeFiles?: bool, includeObjectRelations?: bool, includeAccessPoints?: bool, serviceCaller?: IServiceCaller): void;
        static SetPublishSettings(callback: (response: IPortalResponse) => void, objectGUID: string, accessPointGUID: string, startDate: Date, endDate: Date, serviceCaller?: IServiceCaller): void;
    }
    class Metadata {
        static Set(callback: (response: IPortalResponse) => void, objectGUID: string, metadataSchemaGUID: string, languageCode: string, revisionID: number, metadataXML: string, serviceCaller?: IServiceCaller): void;
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
