import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import auth from "../middlewares/auth.js"; // 🔥 ADD THIS
import {
  login,
  createUser,
} from "../controllers/users.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */

router.post("/signup", createUser);
router.post("/signin", login);

/* =========================
   ENABLE AUTH HERE
========================= */

router.use(auth); // 🔥 TURN AUTH ON

/* =========================
   PROTECTED ROUTES
========================= */

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;