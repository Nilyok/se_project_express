import express from "express";
import {
  getItems,
  createClothingItem,
  deleteItem,
  likeItem,
  dislikeItem
} from "../controllers/clothingItems.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", auth, createClothingItem);
router.delete("/:id", auth, deleteItem);
router.put("/:id/likes", auth, likeItem);
router.delete("/:id/likes", auth, dislikeItem);


export default router;
