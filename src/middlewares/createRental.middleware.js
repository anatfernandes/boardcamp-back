import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

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
				`SELECT
                    games.*
                FROM games
                JOIN rentals
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

	res.locals.customerId = customerId;
	res.locals.gameId = gameId;
	res.locals.daysRented = daysRented;
	res.locals.game = game;

	next();
}

export { validateCreateRental };
