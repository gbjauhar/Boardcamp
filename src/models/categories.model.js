import joi from "joi"

const categoriesModel = joi.object({
    name: joi.string().required()
})

export default categoriesModel