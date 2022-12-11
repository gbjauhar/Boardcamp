import { Router } from "express"
import {create, findAll} from "../controllers/games.controllers.js"
import gamesValidation from "../middlewares/gamesValidation.middlewares.js"
const router = Router()

router.post("/games", gamesValidation, create)
router.get("/games", findAll)

export default router