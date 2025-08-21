import { setTriage, hasSession } from "@/lib/sessionStore";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { config } from "@/lib/config";
import { logger } from "@/lib/logger";

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
    age: z.number().int().min(config.validation.minAge).max(config.validation.maxAge),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parse = triageSchema.safeParse(body);
    
    if (!parse.success) {
      logger.warn("Dados de triagem inválidos", { errors: parse.error.flatten() });
      return NextResponse.json(
        { error: "Dados inválidos", details: parse.error.flatten() },
        { status: 400 }
      );
    }
    
    const { sessionId, answers } = parse.data;
    
    if (!hasSession(sessionId)) {
      logger.warn(`Tentativa de salvar triagem em sessão inválida: ${sessionId}`);
      return NextResponse.json({ error: "Sessão inválida" }, { status: 400 });
    }
    
    setTriage(sessionId, answers);
    logger.info(`Triagem salva para sessão: ${sessionId}`, { age: answers.age, reasons: answers.reasons.length });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    logger.error("Erro ao salvar triagem", { error: String(error) });
    return NextResponse.json({ error: "Failed to save triage" }, { status: 500 });
  }
} 