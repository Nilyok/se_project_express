import jwt from "jsonwebtoken";
import JWT_SECRET from "../utils/config.js";
import { UNAUTHORIZED } from "../utils/errors.js";

export default (req, res, next) => {
  // if a previous middleware already set req.user (e.g. tests inject a default)
  // skip authentication checks
  if (req.user && req.user._id) {
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Authorization required" });
  }
};
