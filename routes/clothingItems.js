import express from "express";
import {
  getItems,
  createClothingItem,
  deleteItem,
  likeItem,
  dislikeItem
} from "../controllers/clothingItems.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", createClothingItem);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

export default router;
