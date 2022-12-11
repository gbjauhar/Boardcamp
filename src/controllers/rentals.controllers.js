import { connection } from "../database/server.js"
import dayjs from "dayjs"

export async function create(req, res) {
    const { customerId, gameId, daysRented } = req.body
    try {
        const existingCustomer = await connection.query('SELECT * FROM customers WHERE customers.id=$1', [customerId])
        if(existingCustomer.rowCount = 0){
            res.sendStatus(400)
        }
        const existingGame= await connection.query('SELECT * FROM games WHERE games.id=$1', [gameId])
        if(existingGame.rowCount = 0){
            res.sendStatus(400)
        }
        await connection.query('INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);',
        [customerId, gameId, daysRented, dayjs(Date.now()).format('YYYY-MM-DD'),"5000", null, null])
        res.sendStatus(201)

    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}

export async function findAll(req, res) {
    try {
        const rentals = await connection.query('SELECT rentals.*, customers as customer FROM rentals JOIN customers ON rentals."customerId"=customers.id')
        res.send(rentals.rows)

    } catch (err) {
        res.sendStatus(500)
        console.log(err)
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

export async function deleteOne(req, res){

}