import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import auth from "../middlewares/auth.js";
import { login, createUser } from "../controllers/users.js";

const router = express.Router();

/* PUBLIC ROUTES */
router.post("/signup", createUser);
router.post("/signin", login);

/* PROTECTED ROUTES */
router.use(auth);

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;