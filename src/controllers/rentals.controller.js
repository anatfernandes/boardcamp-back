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

async function returnRental(req, res) {
	const { idRental, rental } = res.locals;

	const day_ms = 86400000;

	const rentDateTimestamp = +new Date(`${rental.rentDate}`);
	const rentedTimestamp = rentDateTimestamp + day_ms * rental.daysRented;
	const todayTimestamp = Date.now();

	const delayTimestamp = Math.round(
		(todayTimestamp - rentedTimestamp) / (day_ms * 1)
	);

	const delayFee = delayTimestamp > 0 ? delayTimestamp * gamePricePerDay : 0;

	try {
		await connection.query(
			`UPDATE rentals
            SET "returnDate"=$1, "delayFee"=$2
            WHERE id = $3;`,
			[new Date(todayTimestamp).toISOString().slice(0, 10), delayFee, idRental]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.sendStatus(STATUS_CODE.OK);
}

export { createRental, deleteRental, returnRental };
