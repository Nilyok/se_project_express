import { AppError } from "./AppError.js";

const FORBIDDEN = 403;

export default class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, FORBIDDEN);
  }
}
