import { Router } from "express";
import {
  createSession,
  endSession,
  hasSession,
} from "../store/sessionStore.js";

const router = Router();

router.post("/start", (_req, res) => {
  const sessionId = createSession();
  res.status(201).json({ sessionId });
});

router.post("/end", (req, res) => {
  const { sessionId } = req.body || {};
  if (!sessionId || !hasSession(sessionId)) {
    return res.status(400).json({ error: "Sessão inválida" });
  }
  endSession(sessionId);
  res.status(204).send();
});

export default router;
