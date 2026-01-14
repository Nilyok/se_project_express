import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/users.js";

const router = express.Router();

// SPRINT 12 ROUTES (PUBLIC)
router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:userId", getUserById);

// SPRINT 13 ROUTES
router.get("/users/me", getCurrentUser);
router.patch("/users/me", updateCurrentUser);

export default router;
