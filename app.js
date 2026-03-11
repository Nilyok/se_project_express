import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import { NOT_FOUND } from "./utils/errors.js";

dotenv.config();

const app = express();

/* Logger */
app.use((req, res, next) => {
  console.log("➡️ Request received:", req.method, req.url);
  next();
});

/* Middleware */
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
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

const { PORT = 3001 } = process.env;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;