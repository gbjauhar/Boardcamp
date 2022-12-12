import { connection } from "../database/server.js"

export async function create(req, res) {
    const { name, phone, cpf, birthday } = req.body
    try {
        const existingCPF = await connection.query('SELECT * FROM customers WHERE customers.cpf=$1', [cpf])
        if(existingCPF.rowCount > 0){
            return res.sendStatus(409)
        }
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);', [name, phone, cpf, birthday])
        res.sendStatus(201)

    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}

export async function findAll(req, res) {
    const cpf = req.query.cpf
    try {
        if(cpf){
            const pattern = `${cpf}%`
            const {rows} = await connection.query('SELECT * FROM customers WHERE cpf ILIKE $1;', [pattern])
            if(rows.length === 0){
                return res.sendStatus(404)
            }else{
                return res.send(rows)
        }
    }
        const customers = await connection.query('SELECT * FROM customers;')
        res.send(customers.rows)

    } catch (err) {
        console.log(err)
        res.status(500)
    }

}

export async function findById(req, res){
    const {id} = req.params
    try {
        const {rows} = await connection.query('SELECT * FROM customers WHERE id=$1;',[id])
        if(rows.length === 0){
            return res.status(404).send("There's no customer by that name")
        }
        res.send(rows[0])

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function update(req, res){
    const {name, phone, cpf, birthday} = req.body
    const {id} = req.params
    try{
        const existingCPF = await connection.query('SELECT * FROM customers WHERE customers.cpf=$1', [cpf])
        if(existingCPF.rowCount > 0){
            return res.sendStatus(409)
        }
        await connection.query('UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5', [name, phone, cpf, birthday, id])
        res.sendStatus(200)
    } catch (err){
        res.sendStatus(500)
        console.log(err)
    }
}