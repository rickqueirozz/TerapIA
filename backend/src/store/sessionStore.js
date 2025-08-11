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

export function endSession(sessionId) {
  return sessions.delete(sessionId);
}

export function setTriage(sessionId, triageData) {
  const session = sessions.get(sessionId);
  if (!session) return false;
  session.triage = { ...triageData, savedAt: Date.now() };
  return true;
}

export function getTriage(sessionId) {
  return sessions.get(sessionId)?.triage || null;
}

export function appendMessage(sessionId, role, content) {
  const session = sessions.get(sessionId);
  if (!session) return false;
  session.messages.push({ role, content, at: Date.now() });
  return true;
}

export function hasSession(sessionId) {
  return sessions.has(sessionId);
}
