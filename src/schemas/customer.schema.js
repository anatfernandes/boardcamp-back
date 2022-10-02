import joi from "joi";

const customerSchema = joi.object({
	name: joi.string().required(),
	phone: joi
		.string()
		.regex(/^[0-9]{10,11}$/)
		.message("O telefone deve ser uma string de 10 a 11 caracteres numéricos")
		.required(),
	cpf: joi
		.string()
		.regex(/^[0-9]{11}$/)
		.message("O cpf deve ser uma string com 11 caracteres numéricos")
		.required(),
	birthday: joi.date().required(),
});

export { customerSchema };
