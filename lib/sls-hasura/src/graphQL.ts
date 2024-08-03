import axios from "axios";
import { HasuraResult } from "./hasuraType";

export default class GraphQL {
	private HasuraUrl: string;
	private HasuraSecret: string;

	constructor(hasuraUrl: string, hasuraSecret: string) {
		this.HasuraUrl = hasuraUrl;
		this.HasuraSecret = hasuraSecret;
	}

	public async QueryData<T = any, T2 = object>(
		query: string,
		variables?: T2,
		userId?: string,
	): Promise<GraphQLResult<T>> {
		let header: object = {
			"content-type": "application/json",
			"x-hasura-admin-secret": this.HasuraSecret,
		};

		if (userId) {
			header = {
				...header,
				"x-hasura-role": "user",
				"x-hasura-user-id": userId,
				"x-hasura-device": "web",
			};
		}

		var result = await axios.post<HasuraResult<T>>(
			this.HasuraUrl,
			{
				query: query,
				variables: variables,
			},
			{
				headers: header,
			},
		);

		if (process.env.STAGE === "dev") {
			console.log(result.data);
			console.log(result.status);
		}

		return {
			data: result.data.data,
			errors: result.data?.errors,
			raw: result.data,
			status: result.status,
		};
	}
}

export type GraphQLResult<T> = HasuraResult<T> & {
	status: number;
};

export interface GraphQLData<T> {
	data: T;
	status: number;
}
