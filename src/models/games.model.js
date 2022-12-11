import joi from "joi"

const gamesModel = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().positive().required(),
    pricePerDay: joi.number().positive().required(),
    categoryId: joi.number().positive().required()
})

export default gamesModel