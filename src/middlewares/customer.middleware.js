import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { customerSchema } from "../schemas/customer.schema.js";

async function validateCustomerData(req, res, next) {
	const { name, cpf, phone, birthday } = req.body;
	const { id } = req.params;

	if (id && isNaN(id)) return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);

	const isValidData = customerSchema.validate(
		{
			name,
			cpf,
			phone,
			birthday,
		},
		{ abortEarly: false }
	);

	if (isValidData.error) {
		const errors = isValidData.error.details.map((error) => error.message);
		return res.status(STATUS_CODE.BAD_REQUEST).send({ message: errors });
	}

	try {
		const hasCpf = id
			? await connection.query(
					`
					SELECT cpf
					FROM customers
					WHERE cpf = $1 AND id <> $2;`,
					[cpf, id]
			  )
			: await connection.query("SELECT cpf FROM customers WHERE cpf = $1;", [
					cpf,
			  ]);

		if (hasCpf.rows.length !== 0)
			return res
				.status(STATUS_CODE.CONFLICT)
				.send({ message: "Esse cliente já existe." });
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	next();
}

export { validateCustomerData };
