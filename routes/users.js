import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/users.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);

export default router;