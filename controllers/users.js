
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import {
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
  DEFAULT_ERROR,
} from "../utils/errors.js";

import JWT_SECRET from "../utils/config.js";

/* =========================
   SIGNUP (CREATE USER)
========================= */
export const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(201).send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      })
    )
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
};

/* =========================
   SIGNIN (LOGIN)
========================= */
export const login = (req, res) => {
  const { email, password } = req.body;

  // INPUT VALIDATION
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.send({ token });
    })
    .catch(() =>
      res
        .status(UNAUTHORIZED)
        .send({ message: "Incorrect email or password" })
    );
};


/* =========================
   Get User
========================= */
export const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      return res.send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch(() =>
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." })
    );
};

/* =========================
   UPDATE User
========================= */

export const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    {
      new: true,
      runValidators: true
    }
  )
    .then((user) => {
    if (!user) {
      return res.status(NOT_FOUND).send({ message: "User not found" });
    }

      return res.send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).send({
        message: "Invalid data for updating user",
      });
    }

    return res.status(DEFAULT_ERROR).send({
      message: "An error has occurred on the server.",
    });
    });
};

/* =========================
   Get Users
========================= */

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." })
    );
};

/* =========================
   Get User ID
========================= */

export const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
    if (!user) {
      return res.status(NOT_FOUND).send({ message: "User not found" });
    }


      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid user ID",
        });
      }

      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};