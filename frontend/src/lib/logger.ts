// Sistema de logging simplificado para substituir Winston
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Manter apenas os últimos 1000 logs

  private log(level: LogLevel, message: string, data?: Record<string, unknown>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    };

    this.logs.push(entry);
    
    // Limitar número de logs em memória
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output com cores
    const colors = {
      [LogLevel.ERROR]: '\x1b[31m', // Vermelho
      [LogLevel.WARN]: '\x1b[33m',  // Amarelo
      [LogLevel.INFO]: '\x1b[36m',  // Ciano
      [LogLevel.DEBUG]: '\x1b[37m'  // Branco
    };
    
    const reset = '\x1b[0m';
    const timestamp = entry.timestamp.split('T')[1].split('.')[0];
    
    console.log(
      `${colors[level]}[${timestamp}] ${level.toUpperCase()}:${reset} ${message}`,
      data ? data : ''
    );
  }

  error(message: string, data?: Record<string, unknown>) {
    this.log(LogLevel.ERROR, message, data);
  }

  warn(message: string, data?: Record<string, unknown>) {
    this.log(LogLevel.WARN, message, data);
  }

  info(message: string, data?: Record<string, unknown>) {
    this.log(LogLevel.INFO, message, data);
  }

  debug(message: string, data?: Record<string, unknown>) {
    this.log(LogLevel.DEBUG, message, data);
  }

  // Obter logs para debugging
  getLogs(level?: LogLevel, limit = 50): LogEntry[] {
    let filtered = this.logs;
    if (level) {
      filtered = this.logs.filter(log => log.level === level);
    }
    return filtered.slice(-limit);
  }

  // Limpar logs antigos
  cleanup() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    this.logs = this.logs.filter(log => new Date(log.timestamp) > oneHourAgo);
  }
}

export const logger = new Logger();

// Limpeza automática a cada hora
if (typeof window === 'undefined') {
  setInterval(() => logger.cleanup(), 60 * 60 * 1000);
} 