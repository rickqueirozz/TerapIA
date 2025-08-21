import { appendMessage, getTriage, hasSession } from "@/lib/sessionStore";
import { generateTherapyResponse } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { config } from "@/lib/config";
import { logger } from "@/lib/logger";

const chatSchema = z.object({
  sessionId: z.string().uuid(),
  message: z.string().min(1).max(config.validation.maxMessageLength),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parse = chatSchema.safeParse(body);
    
    if (!parse.success) {
      logger.warn("Dados de chat inválidos", { errors: parse.error.flatten() });
      return NextResponse.json(
        { error: "Dados inválidos", details: parse.error.flatten() },
        { status: 400 }
      );
    }
    
    const { sessionId, message } = parse.data;
    
    if (!hasSession(sessionId)) {
      logger.warn(`Tentativa de chat em sessão inválida: ${sessionId}`);
      return NextResponse.json({ error: "Sessão inválida" }, { status: 400 });
    }

    appendMessage(sessionId, "user", message);
    const triage = getTriage(sessionId);

    logger.info(`Processando mensagem de chat para sessão: ${sessionId}`, { 
      messageLength: message.length,
      hasTriage: !!triage 
    });

    const ai = await generateTherapyResponse({
      userMessage: message,
      triage,
      history: [],
    });
    
    appendMessage(sessionId, "assistant", ai.text);
    logger.info(`Resposta AI gerada para sessão: ${sessionId}`, { 
      responseLength: ai.text.length 
    });

    return NextResponse.json({ reply: ai.text });
  } catch (error) {
    logger.error("Erro ao processar chat", { error: String(error) });
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
} 