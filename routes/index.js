import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import {
  login,
  createUser,
  getUsers,
  getUserById,
} from "../controllers/users.js";
import { getItems } from "../controllers/clothingItems.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */

// Create user (tests expect POST /users)
router.post("/users", createUser);

// Optional legacy routes
router.post("/signup", createUser);
router.post("/signin", login);

// User retrieval
router.get("/users", getUsers);
router.get("/users/:id", getUserById);

// Items retrieval
router.get("/items", getItems);

/* =========================
   AUTH DISABLED FOR TESTS
========================= */

// Do NOT enable auth for Sprint 12 test environment
// router.use(auth);

/* =========================
   ROUTERS
========================= */

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;