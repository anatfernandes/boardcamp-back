import joi from "joi";

const customerSchema = joi.object({
	name: joi.string().required(),
	phone: joi
		.string()
		.regex(/^[0-9]{10,11}$/)
		.required(),
	cpf: joi
		.string()
		.regex(/^[0-9]{11}$/)
		.required(),
	birthday: joi
		.string()
		.regex(/^(1[0-9]{3}|2[0-9]{3})[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)
		.message("Date format: YYYY-MM-DD")
		.required(),
});

export { customerSchema };
