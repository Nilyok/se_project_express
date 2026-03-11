import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import { login, createUser } from "../controllers/users.js";
import { getItems } from "../controllers/clothingItems.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

/* Public routes */
router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", getItems);

/* Protected routes */
router.use(auth);

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;