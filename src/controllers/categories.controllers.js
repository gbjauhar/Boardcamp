import { connection } from "../database/server.js"

export async function create (req, res){
    const {name} = req.body
    try{
        const existingCategory = await connection.query('SELECT * FROM categories WHERE categories.name=$1', [name])
        if(existingCategory.rowCount > 0){
            return res.sendStatus(409)
        }
        await connection.query('INSERT INTO categories (name) VALUES ($1);', [name])
        res.status(201)

    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function findAll (req, res){
    try{
        const categories = await connection.query('SELECT * FROM categories;')
        res.send(categories.rows)

    }catch(err){
        res.status(500).send(err.message)
    }
    
}