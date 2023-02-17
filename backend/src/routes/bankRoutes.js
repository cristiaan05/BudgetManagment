import express from "express";
import { addAcount, getAccounts } from "../controllers/bankController.js";
import { auth } from "../middleware/auth.middleware.js";


const bankRouter = express.Router();

bankRouter.post("/addAcount", auth,addAcount);
bankRouter.get("/getAccounts",auth,getAccounts);

export default bankRouter;