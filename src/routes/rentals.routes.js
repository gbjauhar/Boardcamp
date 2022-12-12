import { Router } from "express"
import {create, findAll, update, deleteOne} from "../controllers/rentals.controllers.js"

const router = Router()

router.post("/rentals", create)
router.get("/rentals", findAll)
router.delete("/rentals/:id", deleteOne)
router.post("/rentals/:id/return", update)


export default router