import express from "express"
import categoriesRoutes from "./routes/categories.routes.js"
import gamesRoutes from "./routes/games.routes.js"
import customersRoutes from "./routes/customers.routes.js"
import rentalsRoutes from "./routes/rentals.routes.js"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors());
app.use(categoriesRoutes)
app.use(gamesRoutes)
app.use(customersRoutes)
app.use(rentalsRoutes)

  app.listen(4000, () =>
  console.log(`Server running in port: 4000`)
);