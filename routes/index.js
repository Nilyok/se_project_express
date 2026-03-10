import express from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import auth from "../middlewares/auth.js";
import {
  login,
  createUser,
  getUsers,
  getUserById,
} from "../controllers/users.js";

const router = express.Router();

/* PUBLIC ROUTES */
// user creation and authentication
router.post("/signup", createUser); // legacy path
router.post("/signin", login);

// expose users collection for tests and clients
router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);

/* PROTECTED ROUTES */
router.use(auth);

// only authenticated operations go below
router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;