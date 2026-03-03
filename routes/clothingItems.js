import express from "express";
import {
  getItems,
  createClothingItem,
  deleteItem,
  likeItem,
  dislikeItem,
} from "../controllers/clothingItems.js";

const router = express.Router();

router.get("/", getItems); // PUBLIC

router.post("/", createClothingItem);
router.delete("/:id", deleteItem);
router.put("/:id/likes", likeItem);
router.delete("/:id/likes", dislikeItem);

export default router;