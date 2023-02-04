import express from "express";
import { addAcount } from "../controllers/bankController.js";
import { auth } from "../middleware/auth.middleware.js";


const bankRouter = express.Router();

bankRouter.post("/addAcount", auth,addAcount);

export default bankRouter;