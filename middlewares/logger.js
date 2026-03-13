import winston from "winston";

const { combine, timestamp, json, colorize, simple } = winston.format;

const createLogger = (filename) => {
  const transports = [new winston.transports.File({ filename })];

  if (process.env.NODE_ENV !== "production") {
    transports.push(
      new winston.transports.Console({
        format: combine(colorize(), simple()),
      })
    );
  }

  return winston.createLogger({
    level: "info",
    format: combine(timestamp(), json()),
    transports,
  });
};

const requestWinstonLogger = createLogger("request.log");
const errorWinstonLogger = createLogger("error.log");

export const requestLogger = (req, res, next) => {
  requestWinstonLogger.info({
    message: "Incoming request",
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });
  next();
};

export const errorLogger = (err, req, res, next) => {
  errorWinstonLogger.error({
    message: err.message,
    method: req.method,
    url: req.originalUrl,
    statusCode: err.statusCode,
    stack: err.stack,
  });
  next(err);
};
