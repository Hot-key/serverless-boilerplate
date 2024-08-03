import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	plop.setGenerator("app", {
		description: "Generator app",
		// gather information from the user
		prompts: [
			{
				type: "input",
				name: "name",
				message: "service name",
			},
		],
		// perform actions based on the prompts
		actions: [
			{
				type: "addMany",
				destination: "../../../{{dashCase name}}",
				base: `templates`,
				templateFiles: `templates/**/*`,
			},
		],
	});
}
