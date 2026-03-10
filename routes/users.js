import express from "express";
import {
  getUsers,
  getUserById,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/users.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

/* PUBLIC USER ROUTES */
router.get("/", getUsers);

/* PROTECTED USER ROUTES */
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

/* PUBLIC ROUTE */
router.get("/:id", getUserById);

export default router;