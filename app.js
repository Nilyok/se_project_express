import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import { NOT_FOUND } from "./utils/errors.js";

const app = express();
app.use((req, res, next) => {
  req.user = { _id: "6917cf18440c557a34a55c21" };
  next();
});

// MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB connection error:", err));

app.use(express.json());

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
