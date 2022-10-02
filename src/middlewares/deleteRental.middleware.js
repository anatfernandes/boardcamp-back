import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

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

export { validateDeleteRental };
