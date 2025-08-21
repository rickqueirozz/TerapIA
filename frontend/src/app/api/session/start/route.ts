import { createSession } from "@/lib/sessionStore";
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST() {
  try {
    const sessionId = createSession();
    logger.info(`Nova sessão criada: ${sessionId}`);
    return NextResponse.json({ sessionId }, { status: 201 });
  } catch (error) {
    logger.error("Erro ao criar sessão", { error: String(error) });
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
} 