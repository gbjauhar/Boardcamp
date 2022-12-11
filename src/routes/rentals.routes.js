import { Router } from "express"
import {create, findAll, update, deleteOne} from "../controllers/rentals.controllers.js"

const router = Router()

router.post("/rentals", create)
router.get("/rentals", findAll)
router.put("/rentals/:id", update)
router.delete("/rentals/:id", deleteOne)


export default router