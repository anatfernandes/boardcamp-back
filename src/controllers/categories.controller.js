import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function createCategorie(req, res) {
	const { name } = req.body;

	if (!name) return res.sendStatus(STATUS_CODE.BAD_REQUEST);

	try {
		const hasName = await connection.query(
			"SELECT name FROM categories WHERE name = $1;",
			[name]
		);

		if (hasName.rows.length !== 0) return res.sendStatus(STATUS_CODE.CONFLICT);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	try {
		await connection.query("INSERT INTO categories (name) VALUES ($1);", [
			name,
		]);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.sendStatus(STATUS_CODE.CREATED);
}

async function getCategorie(req, res) {
	let categories;

	try {
		categories = await connection.query("SELECT * FROM categories;");
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.status(STATUS_CODE.OK).send(categories.rows);
}

export { createCategorie, getCategorie };
