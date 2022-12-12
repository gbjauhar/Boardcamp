import { connection } from "../database/server.js"
import dayjs from "dayjs"

export async function create(req, res) {
    const { customerId, gameId, daysRented } = req.body
    try {
        const existingCustomer = await connection.query('SELECT * FROM customers WHERE customers.id=$1;', [customerId])
        if (existingCustomer.rowCount = 0) {
            res.sendStatus(400)
        }
        const existingGame = await connection.query('SELECT * FROM games WHERE games.id=$1;', [gameId])
        if (existingGame.rowCount = 0) {
            res.sendStatus(400)
        }
        const openTab = await connection.query('SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS null;', [gameId])
        const availableGames = await connection.query('SELECT "stockTotal" FROM games WHERE id=$1;', [gameId])
        if (openTab.rowCount === availableGames.rows[0].stockTotal) {
            res.sendStatus(400)
        }
        const rented = await connection.query('SELECT "pricePerDay" FROM games WHERE id=$1;', [gameId])
        await connection.query('INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);',
            [customerId, gameId, daysRented, dayjs(Date.now()).format('YYYY-MM-DD'), daysRented * rented.rows[0].pricePerDay, null, null])
        res.sendStatus(201)

    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}

export async function findAll(req, res) {
    const idCustomer = req.query.customerId
    const idGame = req.query.gameId
    try {
        if (idCustomer) {
            const { rows } = await connection.query('SELECT * FROM customers WHERE id=$1;', [idCustomer])
            if (rows.length === 0) {
                res.sendStatus(404)
            } else {
                res.send(rows)
            }
        }
        if (idGame) {
            const { rows } = await connection.query('SELECT * FROM games WHERE id=$1;', [idGame])
            if (rows.length === 0) {
                res.sendStatus(404)
            } else {
                res.send(rows)
            }
        } else {
            const rentals = await connection.query(`
            SELECT *, customers.name as customers_name, games.name as games_name, categories.name as categories_name 
            FROM rentals 
            LEFT JOIN customers ON 
            rentals."customerId"=customers.id 
            LEFT JOIN games 
            ON rentals."gameId"=games.id 
            LEFT JOIN categories 
            ON games."categoryId"=categories.id;`)
            console.log(rentals)
            const obj = rentals.rows.map((i) => {
                return {
                    id: i.id,
                customerId: i.customerId,
                gameId: i.gameId,
                rentDate: i.rentDate,
                daysRented: i.daysRented,
                returnDate: i.returnDate,
                originalPrice: i.originalPrice,
                delayFee: i.delayFee,
                customer: {
                 id: i.customerId,
                 name: i.customers_name
                },
                game: {
                  id: i.gameId,
                  name: i.games_name,
                  categoryId: i.categoryId,
                  categoryName: i.categories_name
                }
            }
        })
            res.send(obj)
        }
    } catch (err) {
        res.status(500)
        console.log(err)
    }

}


export async function update(req, res) {
    const { id } = req.params
    try {
        const rentedDay = await connection.query('SELECT "rentDate"::text FROM rentals WHERE id=$1;', [id])
        const howManyDays = await connection.query('SELECT "daysRented" FROM rentals WHERE id=$1;', [id])
        const difference = dayjs(rentedDay.rows[0].rentDate).diff(dayjs(Date.now()).format('YYYY-MM-DD'), 'day')
        const originalPrice = await connection.query('SELECT "originalPrice" FROM RENTALS WHERE id=$1;', [id])
        const fee = originalPrice.rows[0].originalPrice / howManyDays.rows[0].daysRented
        let delayFee
        if(difference < howManyDays.rows[0].daysRented){
            delayFee = (difference * fee) * -1
        }
        const existingRental = await connection.query('SELECT * FROM rentals WHERE id=$1;', [id])
        if (existingRental.rowCount === 0) {
            return res.sendStatus(404)
        }
        const closedTab = await connection.query('SELECT "returnDate" FROM rentals WHERE id=$1;', [id])
        if (closedTab.rows[0].returnDate !== null) {
            return res.sendStatus(404)
        }
       
        await connection.query('UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;', [dayjs(Date.now()).format('YYYY-MM-DD'), delayFee, id])
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}

export async function deleteOne(req, res) {
    const { id } = req.params
    try {
        const existingGame = await connection.query('SELECT * FROM rentals WHERE id=$1;', [id])
        if (existingGame.rowCount === 0) {
            return res.sendStatus(404)
        }
        const closedRental = await connection.query('SELECT * FROM rentals WHERE id=$1;', [id])
        if (closedRental.rows[0].returnDate === null) {
            return res.sendStatus(400)
        }
        else {
            res.sendStatus(200)
        }
    } catch (err) {
        console.log(err)

        res.sendStatus(500)
    }
}