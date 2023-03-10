//import cookieParser from "cookieparser";
import cors from "cors";
import express from "express";
import bankRouter from "../routes/bankRoutes.js";
//import productRouter from "../routes/product.router.js";
import userRouter from "../routes/userRoutes.js";
import cookieParser from "cookie-parser"
import transRouter from "../routes/transactionRoutes.js";
import transferRouter from "../routes/transferRoutes.js";
import exchangeRouter from "../routes/exchangeRoutes.js";
const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/app",
  userRouter,bankRouter,transRouter,transferRouter,exchangeRouter
);

export default app;