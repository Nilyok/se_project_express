import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import { NOT_FOUND } from "./utils/errors.js";

const app = express();

/* -------------------------
   Request Logger (Optional)
-------------------------- */
app.use((req, res, next) => {
  console.log("➡️  Request received:", req.method, req.url);
  next();
});

/* -------------------------
   Middleware
-------------------------- */
app.use(cors());
app.use(express.json());

/* -------------------------
   ✅ TEMP TEST USER (Sprint 14 Requirement)
   This is REQUIRED for automated tests.
   Remove later when implementing JWT auth.
-------------------------- */
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});

/* -------------------------
   MongoDB Connection
-------------------------- */
mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB connection error:", err));

/* -------------------------
   Routes
-------------------------- */
app.use("/", routes);

/* -------------------------
   404 Handler
-------------------------- */
app.use("*", (req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

/* -------------------------
   Start Server
-------------------------- */
const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});