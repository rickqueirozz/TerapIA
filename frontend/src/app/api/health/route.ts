import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { config } from "@/lib/config";

export async function GET() {
  try {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    
    logger.info("Health check realizado", { uptime, memoryUsage });
    
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: Math.round(uptime),
      app: config.app.name,
      version: config.app.version,
      environment: process.env.NODE_ENV || "development",
      memory: {
        rss: Math.round(memoryUsage.rss / 1024 / 1024), // MB
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
      }
    });
  } catch (error) {
    logger.error("Erro no health check", { error: String(error) });
    return NextResponse.json(
      { status: "error", message: "Health check failed" },
      { status: 500 }
    );
  }
} 