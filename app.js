import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import { NOT_FOUND } from "./utils/errors.js";

const app = express();

// origin requests
app.use(cors());
app.use(express.json());

// ✅ TEMPORARY: required ONLY for automated tests
if (process.env.NODE_ENV === "test") {
  app.use((req, res, next) => {
    req.user = {
      _id: "5d8b8592978f8bd833ca8133",
    };
    next();
  });
}

// MongoDB
mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB connection error:", err));

// routers
app.use("/", routes);

// 404 handler
app.use("*", (req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
