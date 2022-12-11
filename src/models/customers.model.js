import joi from "joi"

const customersModel = joi.object({
    name: joi.string().required(),
    cpf: joi.string().regex(/^\d+$/).min(11).max(11).required(),
    phone: joi.string().regex(/^\d+$/).min(10).max(11).required(),
    birthday: joi.string().required()
})

export default customersModel