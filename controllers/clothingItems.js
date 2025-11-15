import ClothingItem from "../models/clothingItem.js";
import { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } from "../utils/errors.js";

// GET all items
export const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};

// CREATE item
export const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data for creating item" });
      }

      return res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};

// DELETE item by ID
export const deleteItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID format" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      return res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};

// LIKE item
export const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID format" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      return res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};

// DISLIKE item
export const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID format" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      return res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};
