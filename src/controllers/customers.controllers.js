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
        res.send(customers)

    } catch (err) {
        res.sendStatus(500).send(err.message)
    }

}