import type { TriageAnswers } from "@/types/triage";

export async function startSession(): Promise<{ sessionId: string }> {
  const res = await fetch('/api/session/start', { method: 'POST' });
  if (!res.ok) throw new Error('Falha ao iniciar sessão');
  return res.json();
}

export async function endSession(sessionId: string): Promise<void> {
  const res = await fetch('/api/session/end', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId })
  });
  if (!res.ok) throw new Error('Falha ao encerrar sessão');
}

export async function sendTriage(sessionId: string, answers: TriageAnswers): Promise<void> {
  const res = await fetch('/api/triage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, answers })
  });
  if (!res.ok) throw new Error('Falha ao salvar triagem');
}

export async function sendChatMessage(sessionId: string, message: string): Promise<{ reply: string }> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message })
  });
  if (!res.ok) throw new Error('Falha ao enviar mensagem');
  return res.json();
} 