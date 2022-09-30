import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function createCustomer(req, res) {
	const { name, cpf, phone, birthday } = req.body;

	try {
		await connection.query(
			"INSERT INTO customers (name, cpf, phone, birthday) VALUES ($1, $2, $3, $4);",
			[name, cpf, phone, birthday]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.sendStatus(STATUS_CODE.CREATED);
}

export { createCustomer };
