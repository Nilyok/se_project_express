/* eslint-disable max-classes-per-file */

export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const DEFAULT_ERROR = 500;
export const FORBIDDEN = 403;

export class AppError extends Error {
  constructor(message, statusCode = DEFAULT_ERROR) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, BAD_REQUEST);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authorization required") {
    super(message, UNAUTHORIZED);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Requested resource not found") {
    super(message, NOT_FOUND);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, CONFLICT);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, FORBIDDEN);
  }
}
