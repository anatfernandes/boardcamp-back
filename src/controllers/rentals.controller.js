import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function createRental(req, res) {
	const { customerId, gameId, daysRented, game } = res.locals;

	try {
		await connection.query(
			`INSERT INTO rentals
            ("customerId", "gameId", "daysRented", "originalPrice",
            "rentDate", "returnDate", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
			[
				customerId,
				gameId,
				daysRented,
				game.pricePerDay * daysRented,
				new Date().toISOString().slice(0, 10),
				null,
				null,
			]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.sendStatus(STATUS_CODE.OK);
}

async function deleteRental(req, res) {
	const { idRental } = res.locals;

	try {
		await connection.query("DELETE FROM rentals WHERE id = $1;", [idRental]);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.sendStatus(STATUS_CODE.OK);
}

export { createRental, deleteRental };
