import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import auth from "../middlewares/auth.js";
import { login, createUser } from "../controllers/users.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */

// Auth
router.post("/signin", login);
router.post("/signup", createUser);

// Public items route
router.get("/items", itemsRouter);

/* =========================
   AUTH MIDDLEWARE
========================= */

router.use(auth);

/* =========================
   PROTECTED ROUTES
========================= */

// Users (me)
router.use("/users", usersRouter);

// Protected item actions
router.use("/items", itemsRouter);

export default router;
