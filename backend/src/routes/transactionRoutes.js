import express from "express";
import { addTransaction } from "../controllers/transactionController.js";
import { auth } from "../middleware/auth.middleware.js"



const transRouter = express.Router();

transRouter.post("/addTransaction/:id", auth, addTransaction);

export default transRouter;