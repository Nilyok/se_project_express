import { AppError } from "./AppError.js";

const CONFLICT = 409;

export default class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, CONFLICT);
  }
}
