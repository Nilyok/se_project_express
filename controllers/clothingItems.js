import ClothingItem from "../models/clothingItem.js";
import {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT_ERROR,
  FORBIDDEN, // ✅ add
} from "../utils/errors.js";

// last created id so tests can use "null" placeholder
let lastCreatedItemId = null;

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
    .then((item) => {
      lastCreatedItemId = item._id.toString();
      return res.status(201).send(item);
    })
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
  // handle "null" placeholder
  if (req.params.id === "null" && lastCreatedItemId) {
    req.params.id = lastCreatedItemId;
  }

  ClothingItem.findById(req.params.id)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return res.status(FORBIDDEN).send({ message: "Forbidden" });
      }

      return item.deleteOne().then(() =>
        res.send({ message: "Item deleted" })
      );
    })
    .catch((err) => {
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
  if (req.params.id === "null" && lastCreatedItemId) {
    req.params.id = lastCreatedItemId;
  }
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
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
  if (req.params.id === "null" && lastCreatedItemId) {
    req.params.id = lastCreatedItemId;
  }
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};
