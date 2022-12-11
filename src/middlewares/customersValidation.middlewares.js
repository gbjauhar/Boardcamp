import customersModel from "../models/customers.model.js"

export default function customersValidation(req, res, next){
    const { error } = customersModel.validate(req.body, { abortEarly: false })
    if(error){
        const err = error.details.map(detail => detail.message)
        return res.status(400).send(err)
    }
    next()
}