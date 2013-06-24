module CHAOS.Portal.Client
{
	export interface IPortalClient
	{
		GetServicePath(): string;
		GetCurrentSession(): ISession;
		HasSession(): bool;
		IsAuthenticated(): bool;
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
	    CallService(path: string, httpMethod: string, parameters: { [index: string]: any; }, requiresSession: bool): ICallState;
	    GetServiceCallUri(path: string, parameters: { [index: string]: any; }, requiresSession: bool, format: string): string;
		UpdateSession(session: ISession): void;
		SetSessionAuthenticated(type: string): void;
	}

	export interface ICallState
	{
		WithCallback(callback:(response: IPortalResponse) => void):ICallState;
		WithCallback(callback:(response: IPortalResponse) => void, context:any):ICallState;
		WithCallbackAndToken(callback: (response: IPortalResponse, token: any) => void, token:any): ICallState;
		WithCallbackAndToken(callback: (response: IPortalResponse, token: any) => void, token:any, context: any): ICallState;
	}

	export interface IPortalResponse
	{
		Header: IHeader;
		Result: IPortalResult;
		Error: IError;
	}

	export interface IHeader
	{
		Duration: number;
	}

	export interface IPortalResult
	{
		Count: number;
		TotalCount: number;
		Results: any[];
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

	export class HttpMethod
	{
		public static Get():string { return "GET"; }
		public static Post():string { return "POST"; }
	}
}