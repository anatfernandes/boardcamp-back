import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { customerSchema } from "../schemas/customer.schema.js";


async function validateCustomerData(req, res, next) {
	const { name, cpf, phone, birthday } = req.body;

	const isValidData = customerSchema.validate(
		{
			name,
			cpf,
			phone,
			birthday,
		},
		{ abortEarly: false }
	);

	if (isValidData.error) {
		const errors = isValidData.error.details.map((error) => error.message);
		return res.status(STATUS_CODE.BAD_REQUEST).send({ message: errors });
	}

	try {
		const hasName = await connection.query(
			"SELECT cpf FROM customers WHERE cpf = $1;",
			[`${cpf}`]
		);

		if (hasName.rows.length !== 0)
			return res
				.status(STATUS_CODE.CONFLICT)
				.send({ message: "Esse cliente já existe." });
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	next();
}

async function validateCreateRental(req, res, next) {
	let { customerId, gameId, daysRented } = req.body;

	if (isNaN(customerId) || isNaN(gameId) || isNaN(daysRented)) {
		return res.sendStatus(STATUS_CODE.BAD_REQUEST);
	}

	let customer;
	let game;
	let gameStock;

	try {
		customer = (
			await connection.query("SELECT * FROM customers WHERE id = $1;", [
				customerId,
			])
		).rows[0];
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	try {
		game = (
			await connection.query("SELECT * FROM games WHERE id = $1;", [gameId])
		).rows[0];

		gameStock = (
			await connection.query(
				`SELECT games.* FROM games JOIN rentals
				ON games.id = rentals."gameId"
				WHERE games.id = $1 AND rentals."returnDate" IS NULL;`,
				[gameId]
			)
		).rows;
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (
		!customer ||
		!game ||
		gameStock.length >= game?.stockTotal ||
		daysRented < 1
	) {
		return res.sendStatus(STATUS_CODE.BAD_REQUEST);
	}

	res.locals.customerId = Number(customerId);
	res.locals.gameId = Number(gameId);
	res.locals.daysRented = Number(daysRented);
	res.locals.game = game;

	next();
}

async function validateDeleteRental(req, res, next) {
	const idRental = Number(req.params.id);

	if (isNaN(idRental)) {
		return res.sendStatus(STATUS_CODE.BAD_REQUEST);
	}

	let rental;

	try {
		rental = (
			await connection.query("SELECT * FROM rentals WHERE id = $1;", [idRental])
		).rows[0];
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!rental) {
		return res.sendStatus(STATUS_CODE.NOT_FOUND);
	}

	if (!rental.returnDate) {
		return res.sendStatus(STATUS_CODE.BAD_REQUEST);
	}

	res.locals.idRental = idRental;

	next();
}

async function validateReturnRental(req, res, next) {
	const idRental = Number(req.params.id);

	if (isNaN(idRental)) {
		return res.sendStatus(STATUS_CODE.BAD_REQUEST);
	}

	let rental;

	try {
		rental = (
			await connection.query("SELECT * FROM rentals WHERE id = $1;", [idRental])
		).rows[0];
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!rental) {
		return res.sendStatus(STATUS_CODE.NOT_FOUND);
	}

	if (rental.returnDate) {
		return res.sendStatus(STATUS_CODE.BAD_REQUEST);
	}

	res.locals.rental = rental;
	res.locals.idRental = idRental;

	next();
}

export {
	validateCustomerData,
	validateCreateRental,
	validateDeleteRental,
	validateReturnRental,
};
