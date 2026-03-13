import express from "express";
import {
  getItems,
  createClothingItem,
  deleteItem,
  likeItem,
  dislikeItem,
} from "../controllers/clothingItems.js";
import {
  validateCreateItem,
  validateItemId,
} from "../middlewares/validation.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", validateCreateItem, createClothingItem);
router.delete("/:id", validateItemId, deleteItem);
router.put("/:id/likes", validateItemId, likeItem);
router.delete("/:id/likes", validateItemId, dislikeItem);

export default router;
