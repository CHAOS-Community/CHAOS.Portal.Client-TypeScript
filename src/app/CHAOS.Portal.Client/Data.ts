module CHAOS.Portal.Client
{
	export interface IPortalClient
	{
		GetServicePath(): string;
		GetCurrentSession(): ISession;
		HasSession(): boolean;
		IsAuthenticated(): boolean;
		SessionAcquired(): IEvent;
		SessionAuthenticated(): IEvent;
		ClientGuid: string;
	}

	export interface ISession
	{
		Guid: string;
		UserGuid: string;
		DateCreated: number;
		DateModified: number;
		FullName: string;
	}

	export interface IServiceCaller
	{
	    CallService<T>(path: string, method: HttpMethod, parameters: { [index: string]: any; }, requiresSession: bool): ICallState<T>;
	    GetServiceCallUri(path: string, parameters: { [index: string]: any; }, requiresSession: bool, format: string): string;
		UpdateSession(session: ISession): void;
		SetSessionAuthenticated(type: string): void;
	}

	export interface ICallState<T>
	{
		WithCallback(callback:(response: IPortalResponse<T>) => void):ICallState;
        WithCallback(callback: (response: IPortalResponse<T>) => void, context:any):ICallState;
        WithCallbackAndToken(callback: (response: IPortalResponse<T>, token: any) => void, token:any): ICallState;
        WithCallbackAndToken(callback: (response: IPortalResponse<T>, token: any) => void, token:any, context: any): ICallState;
	}

	export interface IPortalResponse<T>
	{
		Header: IHeader;
		Body: IPortalResult<T>;
		Error: IError;
	}

	export interface IHeader
	{
		Duration: number;
	}

	export interface IPortalResult<T>
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

	export interface IEvent
	{
		Add(handler: (any) => void ): void;
		Remove(handler: (any) => void ): void;
	}

	export enum HttpMethod
	{
		Get,
		Post
	}
}