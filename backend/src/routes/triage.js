import { Router } from "express";
import { z } from "zod";
import { setTriage, hasSession } from "../store/sessionStore.js";

const router = Router();

const triageSchema = z.object({
  sessionId: z.string().uuid(),
  answers: z.object({
    feelingToday: z.string(),
    feelingOtherText: z.string().optional(),
    hadTherapyBefore: z.boolean(),
    therapyDuration: z.string().optional(),
    reasons: z.array(z.string()),
    reasonsOtherText: z.string().optional(),
    takingMeds: z.boolean(),
    medsWhich: z.string().optional(),
    selfHarmThoughts: z.boolean(),
    overwhelmFrequency: z.enum([
      "Sempre",
      "Frequentemente",
      "Às vezes",
      "Raramente",
      "Nunca",
    ]),
    hasSomeoneToTalk: z.boolean(),
    age: z.number().int().min(1).max(120),
  }),
});

router.post("/", (req, res) => {
  const parse = triageSchema.safeParse(req.body);
  if (!parse.success) {
    return res
      .status(400)
      .json({ error: "Dados inválidos", details: parse.error.flatten() });
  }
  const { sessionId, answers } = parse.data;
  if (!hasSession(sessionId)) {
    return res.status(400).json({ error: "Sessão inválida" });
  }
  setTriage(sessionId, answers);
  res.status(201).json({ ok: true });
});

export default router;
