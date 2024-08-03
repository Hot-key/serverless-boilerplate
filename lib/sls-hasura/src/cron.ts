import axios, { Axios, AxiosInstance } from "axios";

export interface ScheduledTriggerData<T> {
	created_at: string;
	id: string;
	payload: T;
	scheduled_time: string;
}

export interface RetryConfST {
	num_retries: number;
	retry_interval_seconds: number;
	timeout_seconds: number;
	tolerance_seconds: number;
}

type CreateScheduledTriggerResponse =
	| {
			status: 200;
			message: string;
			event_id: string;
	  }
	| {
			status: 500;
			message: string;
	  };

export class Cron {
	private HasuraUrl: string;
	private HasuraSecret: string;

	private instance: AxiosInstance;

	constructor(hasuraUrl: string, hasuraSecret: string) {
		this.HasuraUrl = hasuraUrl.replace("v1/graphql", "v1/metadata");
		this.HasuraSecret = hasuraSecret;

		this.instance = axios.create({
			baseURL: this.HasuraUrl,
			headers: {
				"content-type": "application/json",
				"x-hasura-admin-secret": this.HasuraSecret,
			},
		});
	}

	public async CreateScheduledTrigger<T = any>(
		webhook: string,
		schedule_at: string,
		payload?: T,
		comment?: string,
		headers?: Array<{ name: string; value: string }>,
		retry_conf?: RetryConfST,
	): Promise<CreateScheduledTriggerResponse> {
		try {
			const response = await this.instance.post<{ message: string; event_id: string }>("", {
				type: "create_scheduled_event",
				args: {
					webhook: webhook,
					schedule_at: schedule_at,
					payload: payload ?? {},
					headers: headers ?? [],
					retry_conf: retry_conf,
					comment: comment,
				},
			});

			return {
				status: 200,
				message: response.data.message,
				event_id: response.data.event_id,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					status: 500,
					message: error.response?.data?.message ?? "",
				};
			}
			return {
				status: 500,
				message: "",
			};
		}
	}

	public async DeleteScheduledTrigger(
		event_id: string,
		type: "one_off" | "cron" = "one_off",
	): Promise<{ status: number }> {
		try {
			const response = await this.instance.post<{ message: string; event_id: string }>("", {
				type: "delete_scheduled_event",
				args: {
					type: type,
					event_id: event_id,
				},
			});

			return {
				status: response.status,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					status: error.status ?? 500,
				};
			}
			return {
				status: 500,
			};
		}
	}
}
