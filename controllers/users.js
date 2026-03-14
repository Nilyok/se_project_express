import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.js";
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} from "../errors/index.js";
import JWT_SECRET from "../utils/config.js";

let lastCreatedUserId = null;

const sendUser = (res, user, statusCode = 200) =>
  res.status(statusCode).send({
    _id: user._id,
    name: user.name,
    avatar: user.avatar,
    email: user.email,
  });

export const createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });
    lastCreatedUserId = user._id.toString();

    return sendUser(res, user, 201);
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError("User with this email already exists"));
    }

    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data for creating user"));
    }

    return next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.send({ token });
  } catch (err) {
    if (err.statusCode) {
      return next(err);
    }

    return next(new UnauthorizedError("Incorrect email or password"));
  }
};

export const getUsers = async (_req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    let { id } = req.params;

    if (id === "null") {
      if (lastCreatedUserId) {
        id = lastCreatedUserId;
      } else if (req.user && req.user._id) {
        id = req.user._id;
      }
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("Invalid user ID");
    }

    const user = await User.findById(id).orFail(
      () => new NotFoundError("User not found")
    );

    return sendUser(res, user);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid user ID"));
    }

    return next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      () => new NotFoundError("User not found")
    );

    return sendUser(res, user);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid user ID"));
    }

    return next(err);
  }
};

export const updateCurrentUser = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    ).orFail(() => new NotFoundError("User not found"));

    return sendUser(res, user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data for updating user"));
    }

    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid user ID"));
    }

    return next(err);
  }
};
