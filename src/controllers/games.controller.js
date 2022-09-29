import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function createGame(req, res) {
	const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

	let hasCategorie;

	try {
		hasCategorie = await connection.query(
			"SELECT * FROM categories WHERE id = $1;",
			[categoryId]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (
		!name ||
		!image ||
		hasCategorie.rows.length === 0 ||
		Number(stockTotal) < 1 ||
		Number(pricePerDay) < 1 ||
		isNaN(stockTotal) ||
		isNaN(pricePerDay)
	) {
		return res.sendStatus(STATUS_CODE.BAD_REQUEST);
	}

	try {
		const hasName = await connection.query(
			"SELECT * FROM games WHERE name = $1;",
			[name]
		);

		if (hasName.rows.length !== 0) return res.sendStatus(STATUS_CODE.CONFLICT);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	try {
		await connection.query(
			'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);',
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
