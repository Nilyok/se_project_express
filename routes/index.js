import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import auth from "../middlewares/auth.js";
import { login, createUser } from "../controllers/users.js";

const router = express.Router();

// PUBLIC AUTH ROUTES
router.post("/signin", login);
router.post("/signup", createUser);

// SPRINT 12 + 13 USERS ROUTES (NO AUTH HERE)
router.use("/", usersRouter);

// AUTH MIDDLEWARE (AFTER users)
router.use(auth);

// ITEMS ROUTES
router.use("/items", itemsRouter);

export default router;
