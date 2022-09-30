import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function createGame(req, res) {
	const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

	try {
		await connection.query(
			`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
				VALUES ($1, $2, $3, $4, $5);`,
			[name, image, stockTotal, categoryId, pricePerDay]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.sendStatus(STATUS_CODE.CREATED);
}

async function getGames(req, res) {
	let games;

	try {
		games = (await connection
			.query(`SELECT games.*, categories.name AS categoryName FROM games JOIN categories
				ON games."categoryId" = categories.id;`)).rows;
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.status(STATUS_CODE.OK).send(games);
}

export { createGame, getGames };
