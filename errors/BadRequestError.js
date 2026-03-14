import { AppError } from "./AppError.js";

const BAD_REQUEST = 400;

export default class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, BAD_REQUEST);
  }
}
