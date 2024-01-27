import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import helmet from "helmet"; // security package
import dbConnection from "./dbConfig/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import router from "./routes/index.js";

const __dirname = path.resolve(path.dirname(""));
dotenv.config();
const app = express();
app.use(express.static(path.join(__dirname, "views/build")));
const PORT = process.env.PORT || 8800;
dbConnection();
// middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.use(router);

// middlewares handles error message if router return some error , it just format the error into proper message
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
