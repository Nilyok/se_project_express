import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import auth from "../middlewares/auth.js";

import { login, createUser } from "../controllers/users.js";
import { getItems } from "../controllers/clothingItems.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */
router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", getItems); // ✅ public GET items

/* =========================
   AUTH MIDDLEWARE
========================= */
router.use(auth);

/* =========================
   PROTECTED ROUTES
========================= */
router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;
