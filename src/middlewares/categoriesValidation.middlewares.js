import categoriesModel from "../models/categories.model.js";

export default function categoriesValidation(req, res, next){
    const { error } = categoriesModel.validate(req.body, { abortEarly: false })
    if(error){
        const err = error.details.map(detail => detail.message)
        return res.status(400).send(err)
    }
    next()
}