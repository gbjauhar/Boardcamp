import { connection } from "../database/server.js"

export async function create (req, res){
    const {name} = req.body
    try{
        await connection.query('INSERT INTO categories (name) VALUES ($1);', [name])
        res.sendStatus(201)

    }catch(err){
        res.sendStatus(500).send(err.message)
    }
}

export async function findAll (req, res){
    try{
        const categories = await connection.query('SELECT * FROM categories;')
        res.send(categories.rows)

    }catch(err){
        res.sendStatus(500).send(err.message)
    }
    
}