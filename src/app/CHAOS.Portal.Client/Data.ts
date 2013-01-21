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
		ClientGUID: string;
	}

	export interface ISession
	{
		GUID: string;
		UserGUID: string;
		DateCreated: number;
		DateModified: number;
		FullName: string;
	}

	export interface IServiceCaller
	{
		CallService(callback: (response: IPortalResponse) => void , path: string, httpMethod: string, parameters: { [index:string]:any; }, requiresSession: bool): void;
		UpdateSession(session: ISession): void;
		SetSessionAuthenticated(type: string): void;
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