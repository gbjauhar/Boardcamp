import { Router } from "express"
import {create, findAll, findById, update} from "../controllers/customers.controllers.js"
import customersValidation from "../middlewares/customersValidation.middlewares.js"

const router = Router()

router.post("/customers", customersValidation, create)
router.get("/customers", findAll)
router.get("/customers/:id", findById)
router.put("/customers/:id", customersValidation, update)

export default router