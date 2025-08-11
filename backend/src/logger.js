import winston from "winston";

const { combine, timestamp, json, colorize, printf } = winston.format;

const consoleFormat = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp, ...meta }) => {
    const rest = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `${timestamp} ${level}: ${message}${rest}`;
  })
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: json(),
  transports: [new winston.transports.Console({ format: consoleFormat })],
});

export const httpStream = {
  write: (message) =>
    logger.http ? logger.http(message.trim()) : logger.info(message.trim()),
};
