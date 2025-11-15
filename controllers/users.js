import User from "../models/user.js";
import { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } from "../utils/errors.js";

// GET all users
export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};

// GET user by ID
export const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID format" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      return res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};

// CREATE user
export const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data for creating user" });
      }

      return res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};
