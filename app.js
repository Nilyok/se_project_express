import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { errors as celebrateErrors } from "celebrate";
import routes from "./routes/index.js";
import { NotFoundError } from "./utils/errors.js";
import { requestLogger, errorLogger } from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

/* Middleware */
app.use(requestLogger);
app.use(cors());
app.use(express.json());

/* MongoDB */
mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB connection error:", err));

/* Routes */
app.use("/", routes);

/* 404 */
app.use((_req, _res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errorLogger);
app.use(celebrateErrors());
app.use(errorHandler);

const { PORT = 3001 } = process.env;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
