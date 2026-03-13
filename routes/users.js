import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/users.js";
import auth from "../middlewares/auth.js";
import {
  validateSignup,
  validateUpdateUser,
  validateUserId,
} from "../middlewares/validation.js";

const router = express.Router();

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUpdateUser, updateCurrentUser);

router.get("/", getUsers);
router.post("/", validateSignup, createUser);
router.get("/:id", validateUserId, getUserById);

export default router;
