import express from "express";
import { createTransferWithin } from "../controllers/transferController.js";
import { auth } from "../middleware/auth.middleware.js"



const transferRouter = express.Router();

transferRouter.post("/transferMyAccounts", auth, createTransferWithin);

export default transferRouter;