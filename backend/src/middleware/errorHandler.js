import { logger } from "../logger.js";

export function notFoundHandler(req, res, _next) {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
}

export function errorHandler(err, req, res, _next) {
  logger.error("Unhandled error", { error: err.message, stack: err.stack });
  const status = err.status || 500;
  res.status(status).json({ error: "Internal Server Error" });
}
