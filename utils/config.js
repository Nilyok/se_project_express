const { NODE_ENV, JWT_SECRET } = process.env;
const DEV_SECRET = "dev-secret";

const resolvedSecret =
  NODE_ENV === "production" ? JWT_SECRET : JWT_SECRET || DEV_SECRET;

export default resolvedSecret;
