import { Router } from "express"
import {create, findAll, update} from "../controllers/customers.controllers.js"

const router = Router()

router.post("/customers", create)
router.get("/customers", findAll)
router.put("/customers/:id", update)

export default router