import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import { NOT_FOUND } from "./utils/errors.js";

const app = express();

app.use((req, res, next) => {
  console.log("➡️  Request received:", req.method, req.url);
  next();
});

app.use(cors());
app.use(express.json());

// set a default user id for requests (required by tests)
app.use((req, res, next) => {
  req.user = { _id: "5d8b8592978f8bd833ca8133" };
  next();
});

// MongoDB
mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB connection error:", err));


// routes
app.use("/", routes);

// 404 handler
app.use("*", (req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
