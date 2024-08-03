import GraphQL, { Cron, HasuraInputData, HasuraUser, checkActionSecret } from "@lib/sls-hasura";
import { Context, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";

export const handler = async (
	event: APIGatewayProxyEventV2,
	context: Context,
): Promise<APIGatewayProxyResultV2> => {
	// const inputData = event.body ? (JSON.parse(event.body) : {}) as HasuraTriggerData<T>;
	// const trigger = inputData.event;
	// const hasuraUser = new HasuraUser(inputData);
	// const actionCheck = await checkActionSecret(event);
	// if (actionCheck.result === false) {
	// 	return {
	// 		statusCode: 401,
	// 		body: JSON.stringify({
	// 			data: actionCheck.error,
	// 		}),
	// 	};
	// }

	const inputData = JSON.parse(event.body!) as HasuraInputData<HasuraInput>;
	const data = inputData.input;
	const hasuraUser = new HasuraUser(inputData);

	console.log(event.body);

	return {
		statusCode: 200,
		body: JSON.stringify({
			status: 200,
			message: "",
		}),
	};
};

interface HasuraInput {
	story_id: number;
}
