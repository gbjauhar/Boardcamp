import { connection } from "../database/server.js"

export async function create(req, res){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body
    try{
        const existingCategory = await connection.query('SELECT * FROM categories WHERE categories.id=$1', [categoryId])
        if(existingCategory.rowCount === 0){
            return res.sendStatus(400)
        }
        const existingGame = await connection.query('SELECT * FROM games WHERE games.name=$1', [name])
        if(existingGame.rowCount > 0){
            return res.sendStatus(409)
        }
        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', 
        [name, image, stockTotal, categoryId, pricePerDay])
        res.sendStatus(201)
    }catch (err){
        res.sendStatus(500)
        console.log(err)

    }

}

export async function findAll(req, res){
    const name = req.query.name
    try{
        if(name){
            const pattern = `${name}%`
            const {rows} = await connection.query('SELECT * FROM games WHERE name ILIKE $1;', [pattern])
            if(rows.length === 0){
                res.sendStatus(404)
            }else{
                res.send(rows)
        }
        }
        const {rows}= await connection.query('SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id;')
        res.send(rows)

    }catch(err){
        res.status(500)
        console.log(err)
    }
}