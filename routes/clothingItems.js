import express from "express";
import {
  createClothingItem,
  deleteItem,
  likeItem,
  dislikeItem,
} from "../controllers/clothingItems.js";

const router = express.Router();

// All routes here are protected
router.post("/", createClothingItem);
router.delete("/:id", deleteItem);
router.put("/:id/likes", likeItem);
router.delete("/:id/likes", dislikeItem);

export default router;
