module CHAOS.Portal.Client
{
	export interface IPortalClient
	{
		GetServicePath(): string;
		GetCurrentSession(): ISession;
		HasSession(): boolean;
		IsAuthenticated(): boolean;
		SessionAcquired(): IEvent<ISession>;
		SessionAuthenticated(): IEvent<string>;
		ClientGuid: string;
	}

	export interface ISession
	{
		Guid: string;
		UserGuid: string;
		DateCreated: number;
		DateModified: number;
	}

	export interface IServiceCaller
	{
	    CallService<T>(path: string, method?: HttpMethod, parameters?: { [index: string]: any; }, requiresSession?: boolean): ICallState<T>;
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

	export interface IEvent<T>
	{
		Add(handler: (data:T) => void ): void;
		Remove(handler: (data:T) => void ): void;
	}

	export enum HttpMethod
	{
		Get,
		Post
	}
}