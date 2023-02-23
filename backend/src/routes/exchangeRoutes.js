import express from "express";
import { getExchangeRates } from "../controllers/exchanges.js";
import { auth } from "../middleware/auth.middleware.js"



const exchangeRouter = express.Router();

exchangeRouter.post("/getExchanges", auth, getExchangeRates);

export default exchangeRouter;