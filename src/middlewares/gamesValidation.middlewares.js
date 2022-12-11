import gamesModel from "../models/games.model.js";

export default function gamesValidation(req, res, next){
    const { error } = gamesModel.validate(req.body, { abortEarly: false })
    if(error){
        const err = error.details.map(detail => detail.message)
        return res.status(400).send(err)
    }
    next()
}