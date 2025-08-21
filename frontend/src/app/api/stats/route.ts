import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    // Importar dinamicamente para evitar problemas de SSR
    const { getSessionStats } = await import("@/lib/sessionStore");
    
    const stats = getSessionStats();
    
    logger.info("Estatísticas solicitadas", stats);
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      ...stats
    });
  } catch (error) {
    logger.error("Erro ao obter estatísticas", { error: String(error) });
    return NextResponse.json(
      { error: "Failed to retrieve stats" },
      { status: 500 }
    );
  }
} 