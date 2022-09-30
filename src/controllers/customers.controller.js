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

async function getCustomer(req, res) {
	const { id } = req.params;

	if (isNaN(id)) return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);

	let customer;

	try {
		customer = (
			await connection.query("SELECT * FROM customers WHERE id = $1", [id])
		).rows[0];
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!customer) return res.sendStatus(STATUS_CODE.NOT_FOUND);

	customer.birthday = new Date(customer.birthday).toISOString().slice(0, 10);

	res.status(STATUS_CODE.OK).send(customer);
}

async function updateCustomer(req, res) {
	const { name, cpf, phone, birthday } = req.body;
	const { id } = req.params;

	try {
		await connection.query(
			"UPDATE customers SET name=$1, cpf=$2, phone=$3, birthday=$4 WHERE id = $5;",
			[name, cpf, phone, birthday, id]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.sendStatus(STATUS_CODE.OK);
}

export { createCustomer, getCustomers, getCustomer, updateCustomer };
