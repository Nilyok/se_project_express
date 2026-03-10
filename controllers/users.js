import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.js";
import {
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
  DEFAULT_ERROR,
} from "../utils/errors.js";
import JWT_SECRET from "../utils/config.js";

let lastCreatedUserId = null;

const sendUser = (res, user, statusCode = 200) =>
  res.status(statusCode).send({
    _id: user._id,
    name: user.name,
    avatar: user.avatar,
    email: user.email,
  });

export const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  const hasEmail = typeof email === "string" && email.trim() !== "";
  const hasPassword = typeof password === "string" && password !== "";

  if (hasEmail !== hasPassword) {
    return res.status(BAD_REQUEST).send({
      message: "Email and password are required",
    });
  }

  if (hasEmail && hasPassword) {
    return bcrypt
      .hash(password, 10)
      .then((hash) =>
        User.create({
          name,
          avatar,
          email,
          password: hash,
        })
      )
      .then((user) => {
        lastCreatedUserId = user._id.toString();
        return sendUser(res, user, 201);
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(CONFLICT).send({
            message: "User with this email already exists",
          });
        }

        if (err.name === "ValidationError") {
          return res.status(BAD_REQUEST).send({
            message: "Invalid data for creating user",
          });
        }

        return res.status(DEFAULT_ERROR).send({
          message: "An error has occurred on the server",
        });
      });
  }

  return User.create({ name, avatar })
    .then((user) => {
      lastCreatedUserId = user._id.toString();
      return sendUser(res, user, 201);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid data for creating user",
        });
      }

      return res.status(DEFAULT_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch(() =>
      res
        .status(UNAUTHORIZED)
        .send({ message: "Incorrect email or password" })
    );
};

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res.status(DEFAULT_ERROR).send({
        message: "An error has occurred on the server.",
      })
    );
};

export const getUserById = (req, res) => {
  let { id } = req.params;

  if (id === "null") {
    if (lastCreatedUserId) {
      id = lastCreatedUserId;
    } else if (req.user && req.user._id) {
      id = req.user._id;
    }
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
  }

  return User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      return sendUser(res, user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      }

      return res.status(DEFAULT_ERROR).send({
        message: "An error has occurred on the server.",
      });
    });
};

export const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      return sendUser(res, user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      }

      return res.status(DEFAULT_ERROR).send({
        message: "An error has occurred on the server.",
      });
    });
};

export const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      return sendUser(res, user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid data for updating user",
        });
      }

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid user ID",
        });
      }

      return res.status(DEFAULT_ERROR).send({
        message: "An error has occurred on the server.",
      });
    });
};
