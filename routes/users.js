import express from "express";
import auth from "../middlewares/auth.js";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

export default router;
