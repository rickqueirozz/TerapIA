import { endSession, hasSession } from "@/lib/sessionStore";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId || !hasSession(sessionId)) {
      logger.warn(`Tentativa de encerrar sessão inválida: ${sessionId}`);
      return NextResponse.json({ error: "Sessão inválida" }, { status: 400 });
    }

    endSession(sessionId);
    logger.info(`Sessão encerrada: ${sessionId}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logger.error("Erro ao encerrar sessão", { error: String(error) });
    return NextResponse.json({ error: "Failed to end session" }, { status: 500 });
  }
} 