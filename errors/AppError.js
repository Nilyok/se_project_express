export const DEFAULT_ERROR = 500;

export class AppError extends Error {
  constructor(message, statusCode = DEFAULT_ERROR) {
    super(message);
    this.statusCode = statusCode;
  }
}
