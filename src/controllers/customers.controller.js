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

async function getCustomers(req, res) {
	const { cpf = "" } = req.query;

	let customers;

	try {
		customers = await connection.query(
			"SELECT * FROM customers WHERE cpf LIKE $1",
			[`${cpf}%`]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	customers.rows.forEach((customer) => {
		customer.birthday = new Date(customer.birthday).toISOString().slice(0, 10);
	});

	res.status(STATUS_CODE.OK).send(customers.rows);
}

export { createCustomer, getCustomers };
