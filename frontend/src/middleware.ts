import { NextRequest, NextResponse } from 'next/server';
import { logger } from './lib/logger';

export function middleware(request: NextRequest) {
  const start = Date.now();
  
  // Log da requisição
  logger.info(`HTTP ${request.method} ${request.url}`, {
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') || 'unknown'
  });

  // Processar a requisição
  const response = NextResponse.next();

  // Log da resposta
  response.headers.set('x-response-time', `${Date.now() - start}ms`);
  
  return response;
}

export const config = {
  matcher: [
    // Aplicar a todas as rotas da API
    '/api/:path*',
    // Excluir arquivos estáticos
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 