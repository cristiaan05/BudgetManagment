import express from "express";
import { addTransaction, getTransactions, transactionHistory } from "../controllers/transactionController.js";
import { auth } from "../middleware/auth.middleware.js"



const transRouter = express.Router();

transRouter.post("/addTransaction/:id?", auth, addTransaction);
transRouter.post("/getHistory",auth,transactionHistory)
transRouter.get("/getTransactions",auth,getTransactions)

export default transRouter;