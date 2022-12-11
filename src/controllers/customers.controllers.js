import { connection } from "../database/server.js"

export async function create(req, res) {
    const { name, phone, cpf, birthday } = req.body
    try {
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);', [name, phone, cpf, birthday])
        res.sendStatus(201)

    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}

export async function findAll(req, res) {
    try {
        const customers = await connection.query('SELECT * FROM customers;')
        res.send(customers.rows)

    } catch (err) {
        res.sendStatus(500).send(err.message)
    }

}

export async function update(req, res){
    const {name, phone, cpf, birthday} = req.body
    const {id} = req.params
    try{
        await connection.query('UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5', [name, phone, cpf, birthday, id])
        res.sendStatus(200)
    } catch (err){
        res.sendStatus(500)
        console.log(err)
    }
}