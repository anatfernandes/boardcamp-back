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
	const { name } = req.query;

	let games;

	const searchBase = `SELECT games.*, categories.name AS categoryName
		FROM games JOIN categories
		ON games."categoryId" = categories.id`;

	try {
		games = name
			? await connection.query(
					`${searchBase} WHERE games.name ILIKE $1 ORDER BY games.id;`,
					[`${name}%`]
			  )
			: await connection.query(`${searchBase};`);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.status(STATUS_CODE.OK).send(games.rows);
}

export { createGame, getGames };
