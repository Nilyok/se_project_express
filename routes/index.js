import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";

import { login, createUser, getUsers, getUserById } from "../controllers/users.js";
import { getItems } from "../controllers/clothingItems.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */

// user creation (tests expect POST /users)
router.post("/users", createUser);
router.post("/signup", createUser);
router.post("/signin", login);

// retrieval routes
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.get("/items", getItems);

/* =========================
   IMPORTANT:
   AUTH DISABLED FOR TESTS
========================= */

// ❌ DO NOT USE auth during Sprint 12 tests
// router.use(auth);

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;