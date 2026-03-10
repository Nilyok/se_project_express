import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import { login, createUser } from "../controllers/users.js";

const router = express.Router();

/* AUTH ROUTES */
router.post("/signup", createUser);
router.post("/signin", login);

/* PUBLIC ROUTES */
router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;