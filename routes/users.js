import express from "express";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/users.js";

const router = express.Router();

/* =========================
   PROTECTED USER ROUTES
========================= */

// These require JWT (auth middleware already applied in index.js)
router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);

export default router;
