import { AppError } from "./AppError.js";

const NOT_FOUND = 404;

export default class NotFoundError extends AppError {
  constructor(message = "Requested resource not found") {
    super(message, NOT_FOUND);
  }
}
