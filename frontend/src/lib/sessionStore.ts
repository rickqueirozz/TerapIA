import { randomUUID } from "node:crypto";

const sessions = new Map();

export function createSession() {
  const sessionId = randomUUID();
  sessions.set(sessionId, {
    createdAt: Date.now(),
    triage: null,
    messages: [],
  });
  return sessionId;
}

export function endSession(sessionId: string) {
  return sessions.delete(sessionId);
}

export function setTriage(sessionId: string, triageData: Record<string, unknown>) {
  const session = sessions.get(sessionId);
  if (!session) return false;
  session.triage = { ...triageData, savedAt: Date.now() };
  return true;
}

export function getTriage(sessionId: string) {
  return sessions.get(sessionId)?.triage || null;
}

export function appendMessage(sessionId: string, role: string, content: string) {
  const session = sessions.get(sessionId);
  if (!session) return false;
  session.messages.push({ role, content, at: Date.now() });
  return true;
}

export function hasSession(sessionId: string) {
  return sessions.has(sessionId);
}

export function getSessionStats() {
  const now = Date.now();
  const activeSessions = Array.from(sessions.values()).filter(
    session => now - session.createdAt < 24 * 60 * 60 * 1000 // Últimas 24h
  );
  
  const sessionsWithTriage = activeSessions.filter(session => session.triage);
  const sessionsWithMessages = activeSessions.filter(session => session.messages.length > 0);
  
  return {
    totalSessions: sessions.size,
    activeSessions: activeSessions.length,
    sessionsWithTriage: sessionsWithTriage.length,
    sessionsWithMessages: sessionsWithMessages.length,
    totalMessages: activeSessions.reduce((sum, session) => sum + session.messages.length, 0),
    averageMessagesPerSession: activeSessions.length > 0 
      ? Math.round(activeSessions.reduce((sum, session) => sum + session.messages.length, 0) / activeSessions.length * 100) / 100
      : 0
  };
}

// Limpeza automática de sessões antigas
export function cleanupOldSessions() {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 horas
  
  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.createdAt > maxAge) {
      sessions.delete(sessionId);
    }
  }
} 