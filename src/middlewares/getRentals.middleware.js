async function constructQueryGetRentals(req, res, next) {
	let {
		customerId,
		gameId,
		offset = null,
		limit = null,
		order,
		desc,
	} = req.query;

	let queryWhere = "";
	let variables = [];

	if (
		order !== "id" &&
		order != "rentDate" &&
		order != "returnDate" &&
		order != "daysRented"
	) {
		order = "id";
	}

	if (customerId && gameId) {
		queryWhere = `
            WHERE customers.id = $1
            AND games.id = $2;
        `;
		variables.push(customerId, gameId);
	} else if (customerId) {
		queryWhere = ` WHERE customers.id = $1;`;
		variables.push(customerId);
	} else if (gameId) {
		queryWhere = ` WHERE games.id = $1;`;
		variables.push(gameId);
	} else {
		variables.push(offset, limit);
	}

	let queryOrder = `
		ORDER BY rentals."${order}"
		${desc === "true" ? " DESC " : " ASC "}
	`;

	res.locals.WHERE = queryWhere;
	res.locals.ORDER = queryOrder;
	res.locals.VARIABLES = variables;

	next();
}

export { constructQueryGetRentals };
