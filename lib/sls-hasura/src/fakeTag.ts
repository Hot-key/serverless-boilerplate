export function gql(literals: string | readonly string[], ...args: any[]) {
	let string = "";

	if (typeof literals === "string") {
		literals = [literals];
	}

	for (const [index, literal] of literals.entries()) {
		string += literal;

		if (index in args) string += args[index];
	}

	return string;
}
