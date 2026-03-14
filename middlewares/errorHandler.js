import { DEFAULT_ERROR } from "../errors/index.js";

export default (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  const { statusCode = DEFAULT_ERROR, message } = err;

  return res.status(statusCode).send({
    message:
      statusCode === DEFAULT_ERROR
        ? "An error has occurred on the server"
        : message,
  });
};
