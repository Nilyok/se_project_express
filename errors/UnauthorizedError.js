import { AppError } from "./AppError.js";

const UNAUTHORIZED = 401;

export default class UnauthorizedError extends AppError {
  constructor(message = "Authorization required") {
    super(message, UNAUTHORIZED);
  }
}
