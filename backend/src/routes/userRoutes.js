import express from "express";

import {
  signUp,signIn
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/signIn", signIn);

export default userRouter;