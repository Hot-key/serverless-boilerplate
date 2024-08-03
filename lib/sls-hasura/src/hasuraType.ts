export interface HasuraResult<T> {
	data: T | undefined;
	errors?: Array<{
		message: string;
		extensions: {
			internal: undefined | any;
			path: string;
			code: HasuraQueryError | string;
		};
	}>;

	raw: object;
}

// 확인 가능한 일부만 들어있음
// 나머지는 string type 으로 처리
export enum HasuraQueryError {
	"constraint-violation",
	"parse-failed",
	"data-exception",
	"validation-failed",
	"unexpected",
}

export interface HasuraDataBase {
	session_variables: SessionVariables;
}

export interface HasuraInputData<T> extends HasuraDataBase {
	input: T;
}

export interface HasuraTriggerData<T> extends HasuraDataBase {
	event: EventTrigger<T>;
}

export interface SessionVariables {
	"x-hasura-user-id": string;
	"x-hasura-role": string;
	"x-hasura-session-id": string;
}

export class HasuraUser {
	public data: SessionVariables;

	constructor(data: HasuraDataBase | SessionVariables) {
		this.data = "session_variables" in data ? data.session_variables : data;
	}

	public get userId(): string | undefined {
		return this.data["x-hasura-user-id"];
	}
	public get userRole(): string | undefined {
		return this.data["x-hasura-role"];
	}
	public get sessionId(): string | undefined {
		return this.data["x-hasura-session-id"];
	}
}

export default interface EventTrigger<T = unknown> {
	op: OpType;
	data: {
		new: T;
		old: T;
	};
}

export enum OpType {
	INSERT = "INSERT",
	UPDATE = "UPDATE",
	DELETE = "DELETE",
	MANUAL = "MANUAL",
}
