import { connection } from "../database/server.js"

export async function create(req, res){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body
    try{
        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', 
        [name, image, stockTotal, categoryId, pricePerDay])
        res.sendStatus(201)
    }catch (err){
        res.sendStatus(500)
        console.log(err)

    }

}

export async function findAll(req, res){
    try{
        const games = await connection.query('SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id;')
        res.send(games)

    }catch(err){
        res.sendStatus(500).send(err)
    }
}