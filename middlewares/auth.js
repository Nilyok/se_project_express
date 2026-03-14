import jwt from "jsonwebtoken";
import JWT_SECRET from "../utils/config.js";
import { UnauthorizedError } from "../errors/index.js";

export default (req, _res, next) => {
  if (req.user && req.user._id) {
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return next(new UnauthorizedError("Authorization required"));
  }
};
