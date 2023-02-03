//import cookieParser from "cookieparser";
import cors from "cors";
import express from "express";
//import productRouter from "../routes/product.router.js";
import userRouter from "../routes/userRoutes.js";

const app = express();

app.use(cors());
//app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/app",
  userRouter
);

export default app;