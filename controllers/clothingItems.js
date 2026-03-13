import ClothingItem from "../models/clothingItem.js";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from "../utils/errors.js";

export const getItems = async (_req, res, next) => {
  try {
    const items = await ClothingItem.find({});
    return res.send(items);
  } catch (err) {
    return next(err);
  }
};

export const createClothingItem = async (req, res, next) => {
  try {
    const { name, weather, imageUrl } = req.body;

    if (!req.user || !req.user._id) {
      throw new UnauthorizedError("Authorization required");
    }

    const item = await ClothingItem.create({
      name,
      weather,
      imageUrl,
      owner: req.user._id,
    });

    return res.status(201).send(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data for creating item"));
    }

    return next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findById(req.params.id).orFail(
      () => new NotFoundError("Item not found")
    );

    if (item.owner.toString() !== req.user._id) {
      throw new ForbiddenError("Forbidden");
    }

    await item.deleteOne();

    return res.send({ message: "Item deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item ID format"));
    }

    return next(err);
  }
};

export const likeItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail(() => new NotFoundError("Item not found"));

    return res.send(item);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item ID format"));
    }

    return next(err);
  }
};

export const dislikeItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail(() => new NotFoundError("Item not found"));

    return res.send(item);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item ID format"));
    }

    return next(err);
  }
};
