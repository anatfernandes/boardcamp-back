import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function createRental(req, res) {
	const { customerId, gameId, daysRented, game } = res.locals;

	try {
		await connection.query(
			`INSERT INTO rentals
				("customerId", "gameId", "daysRented", "originalPrice",
				"rentDate", "returnDate", "delayFee")
            VALUES
				($1, $2, $3, $4, $5, $6, $7)`,
			[
				customerId,
				gameId,
				daysRented,
				game.pricePerDay * daysRented,
				new Date().toLocaleDateString("pt-br"),
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

async function getRentals(req, res) {
	const { customerId, gameId } = req.query;

	let rentals;
	let query;

	const searchBase = `
		SELECT
			rentals.*,
			JSON_BUILD_OBJECT
				('id', customers.id,
				'name', customers.name)
				AS customer,
			JSON_BUILD_OBJECT
				('id', games.id,
				'name', games.name,
				'categoryId', games."categoryId",
				'categoryName', categories.name)
				AS game
		FROM rentals
		JOIN customers
			ON customers.id = rentals."customerId"
		JOIN games
			ON games.id = rentals."gameId"
		JOIN categories
			ON games."categoryId" = categories.id
	`;

	if (customerId && gameId) {
		query = `${searchBase}
				WHERE customers.id = $1
				AND games.id = $2;`;
	} else if (customerId) {
		query = `${searchBase} WHERE customers.id = $1;`;
	} else if (gameId) {
		query = `${searchBase} WHERE games.id = $1;`;
	}

	try {
		rentals =
			customerId && gameId
				? await connection.query(`${query} ORDER BY id`, [customerId, gameId])
				: query
				? await connection.query(`${query} ORDER BY id`, [customerId || gameId])
				: await connection.query(`${searchBase} ORDER BY id`);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	rentals.rows.forEach((rentals) => {
		rentals.rentDate = rentals.rentDate.toLocaleDateString("pt-br");
		rentals.returnDate = rentals.returnDate
			? rentals.returnDate.toLocaleDateString("pt-br")
			: null;
	});

	res.status(STATUS_CODE.OK).send(rentals.rows);
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
	const returnDateTimestamp = rentDateTimestamp + day_ms * rental.daysRented;
	const todayTimestamp = Date.now();

	const delayTimestamp = Math.round(
		(todayTimestamp - returnDateTimestamp) / (day_ms * 1)
	);

	const delayFee = delayTimestamp > 0 ? delayTimestamp * gamePricePerDay : 0;

	try {
		await connection.query(
			`UPDATE
				rentals
            SET
				"returnDate"=$1, "delayFee"=$2
            WHERE id = $3;`,
			[new Date(todayTimestamp).toLocaleDateString("pt-br"), delayFee, idRental]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.sendStatus(STATUS_CODE.OK);
}

export { createRental, getRentals, deleteRental, returnRental };
