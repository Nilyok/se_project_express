import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import { createUser, login } from "../controllers/users.js";

const router = express.Router();

// auth routes
router.post("/signup", createUser);
router.post("/signin", login);

// protected resources
router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;
