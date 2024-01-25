import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import helmet from "helmet"; // security package
import dbConnection from "./dbConfig/index.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

dbConnection();
// middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});