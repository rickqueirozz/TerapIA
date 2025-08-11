import { Router } from "express";
import { z } from "zod";
import { appendMessage, getTriage, hasSession } from "../store/sessionStore.js";
import { generateTherapyResponse } from "../services/gemini.js";

const router = Router();

const chatSchema = z.object({
  sessionId: z.string().uuid(),
  message: z.string().min(1).max(2000),
});

router.post("/", async (req, res, next) => {
  try {
    const parse = chatSchema.safeParse(req.body);
    if (!parse.success) {
      return res
        .status(400)
        .json({ error: "Dados inválidos", details: parse.error.flatten() });
    }
    const { sessionId, message } = parse.data;
    if (!hasSession(sessionId)) {
      return res.status(400).json({ error: "Sessão inválida" });
    }

    appendMessage(sessionId, "user", message);
    const triage = getTriage(sessionId);

    const ai = await generateTherapyResponse({
      userMessage: message,
      triage,
      history: [],
    });
    appendMessage(sessionId, "assistant", ai.text);

    res.json({ reply: ai.text });
  } catch (err) {
    next(err);
  }
});

export default router;
