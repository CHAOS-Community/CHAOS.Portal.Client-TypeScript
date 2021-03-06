module CHAOS.Portal.Client
{
	export interface IPortalClient
	{
		GetServicePath(): string;
		GetCurrentSession(): ISession;
		HasSession(): boolean;
		IsAuthenticated(): boolean;
		AuthenticationType():string;
		SessionAcquired(): IEvent<ISession>;
		SessionAuthenticated(): IEvent<string>;
		SetCallHandler(handler: ICallHandler):void;
		ClientGuid: string;
	}

	export interface IServiceCaller
	{
	    CallService<T>(path: string, method?: HttpMethod, parameters?: { [index: string]: any; }, requiresSession?: boolean, format?:string): ICallState<T>;
		GetServiceCallUri(path: string, parameters?: { [index: string]: any; }, requiresSession?: boolean, format?: string): string;
		HasSession(): boolean;
		GetCurrentSession(): ISession;
		GetServicePath(): string;
		UpdateSession(session: ISession): void;
		SetSessionAuthenticated(type: string, userGuid?:string, sessionDateModified?:number): void;
	}

	export interface ICallState<T>
	{
		WithCallback(callback: (response: IPortalResponse<T>) => void): ICallState<T>;
		WithCallback(callback: (response: IPortalResponse<T>) => void, context: any): ICallState<T>;
		WithCallbackAndToken(callback: (response: IPortalResponse<T>, token: any) => void, token: any): ICallState<T>;
		WithCallbackAndToken(callback: (response: IPortalResponse<T>, token: any) => void, token: any, context: any): ICallState<T>;
		TransferProgressChanged(): IEvent<ITransferProgress>;
	}

	export interface ICallHandler
	{
		ProcessResponse<T>(response: IPortalResponse<T>, recaller:(resetSession:boolean)=>void):boolean;
	}

	export interface ISession
	{
		Guid: string;
		UserGuid: string;
		DateCreated: number;
		DateModified: number;
	}

	export interface IPortalResponse<TBody>
	{
		Header: IHeader;
		Body: TBody;
		Error: IError;
	}

	export interface IHeader
	{
		Duration: number;
	}

	export interface IPagedPortalResult<T>
	{
		Count: number;
		TotalCount: number;
		Results: T[];
	}

	export interface IError
	{
		Fullname: string;
		Message: string;
		Stacktrace: string;
		InnerException: IError;
	}

	export interface IEvent<T>
	{
		Add(handler: (data:T) => void ): void;
		Remove(handler: (data:T) => void ): void;
	}

	export interface ITransferProgress
	{
		BytesTransfered: number;
		TotalBytes: number;
		TotalBytesIsKnown:boolean;
	}

	export enum HttpMethod
	{
		Get,
		Post
	}
}