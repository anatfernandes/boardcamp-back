import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function createCategorie(req, res) {
	const { name } = req.body;

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
	let { offset = null, limit = null, order, desc } = req.query;

	let categories;

	if(order !== 'id' && order != 'name') order = true;

	try {
		categories = await connection.query(
			`SELECT
				*
			FROM categories
			ORDER BY ${order}
			${ desc ? ' DESC ' : ' ASC '}
			OFFSET $1
			LIMIT $2;`,
			[offset, limit]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.status(STATUS_CODE.OK).send(categories.rows);
}

export { createCategorie, getCategorie };
