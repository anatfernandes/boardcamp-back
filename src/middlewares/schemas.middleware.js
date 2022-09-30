import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { categorieSchema } from "../schemas/categorie.schema.js";

async function validateNameCategorie(req, res, next) {
	const { name } = req.body;

	const isValidName = categorieSchema.validate({ name });

	if (isValidName.error) {
		const errors = isValidName.error.details.map((error) => error.message);
		return res.status(STATUS_CODE.BAD_REQUEST).send({ message: errors });
	}

	try {
		const hasName = await connection.query(
			"SELECT name FROM categories WHERE name ILIKE $1;",
			[`${name}`]
		);

		if (hasName.rows.length !== 0)
			return res
				.status(STATUS_CODE.CONFLICT)
				.send({ message: "Essa categoria já existe." });
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	next();
}

export { validateNameCategorie };
