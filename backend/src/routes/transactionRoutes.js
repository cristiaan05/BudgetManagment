import express from "express";
import { addTransaction, transactionHistory } from "../controllers/transactionController.js";
import { auth } from "../middleware/auth.middleware.js"



const transRouter = express.Router();

transRouter.post("/addTransaction/:id", auth, addTransaction);
transRouter.get("/getHistory",auth,transactionHistory)

export default transRouter;