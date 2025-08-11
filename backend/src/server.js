import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { logger, httpStream } from "./logger.js";
import chatRouter from "./routes/chat.js";
import triageRouter from "./routes/triage.js";
import sessionRouter from "./routes/session.js";

const app = express();

const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("combined", { stream: httpStream }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/session", sessionRouter);
app.use("/api/triage", triageRouter);
app.use("/api/chat", chatRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Backend listening on http://localhost:${PORT}`);
});
