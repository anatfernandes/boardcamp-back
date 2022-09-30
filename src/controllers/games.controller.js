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
		games = await connection.query("SELECT * FROM games;");
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	let categories;

	try {
		categories = await connection.query("SELECT * FROM categories;");
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	const fullGames = games.rows.map((game) => ({
		...game,
		categoryName: categories.rows[game.categoryId - 1].name,
	}));

	res.status(STATUS_CODE.OK).send(fullGames);
}

export { createGame, getGames };
