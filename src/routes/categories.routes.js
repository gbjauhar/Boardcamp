import { Router } from "express"
import {create, findAll} from "../controllers/categories.controllers.js"
import categoriesValidation from "../middlewares/categoriesValidation.middlewares.js"

const router = Router()

router.post("/categories", categoriesValidation, create)
router.get("/categories", findAll)

export default router