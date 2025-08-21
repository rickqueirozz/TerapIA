// Configuração centralizada do projeto
export const config = {
  // Gemini AI
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
  },
  
  // App
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'TerapIA',
    version: '1.0.0',
  },
  
  // Validação
  validation: {
    maxMessageLength: 2000,
    maxAge: 120,
    minAge: 1,
  },
  
  // Sessão
  session: {
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    cleanupInterval: 60 * 60 * 1000, // 1 hora
  }
};

// Verificar se as variáveis obrigatórias estão definidas
export function validateConfig() {
  if (!config.gemini.apiKey) {
    console.warn('⚠️  GEMINI_API_KEY não está definida. O chat retornará respostas de fallback.');
  }
  
  return {
    isValid: true,
    warnings: config.gemini.apiKey ? [] : ['GEMINI_API_KEY não configurada']
  };
} 