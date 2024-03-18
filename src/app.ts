import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import todoRoute from "./routes/todo-route";

dotenv.config();

import globalErrorController from "./controllers/error-controller";
import AppError from "./utils/app-error";

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>WELCOME TO STRAITPAY</h1>");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/v1/todo", todoRoute);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server`, 500)
  );
});

app.use(globalErrorController);

const db: any = process.env.DATABASE;

async function startServer() {
  const port = process.env.PORT || 8080;
  try {
    const response = await mongoose.connect(db);
    console.log("database connection successful");

    app.listen(port, () => {
      console.log(`app running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
startServer();
