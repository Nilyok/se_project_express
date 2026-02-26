import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import auth from "../middlewares/auth.js";

import { login, createUser, getUsers, getUserById } from "../controllers/users.js";
import { getItems } from "../controllers/clothingItems.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */
// user creation is accessible via POST /users (tests expect this)
router.post("/users", createUser);
// also keep legacy signup path if needed
router.post("/signup", createUser);
router.post("/signin", login);

// user retrieval endpoints for tests
router.get("/users", getUsers);
router.get("/users/:id", getUserById);

router.get("/items", getItems);

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
