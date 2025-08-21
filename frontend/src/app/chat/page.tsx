"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import ThemeToggle from "@/components/ThemeToggle";
import { endSession, sendChatMessage, startSession } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

export default function ChatPage() {
  const { t } = useI18n();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [active, setActive] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function onStart() {
    let id = localStorage.getItem('sessionId');
    if (!id) {
      const s = await startSession();
      id = s.sessionId;
      localStorage.setItem('sessionId', id);
    }
    setSessionId(id);
    setActive(true);
    setMessages([{ from: 'bot', text: 'Olá! Sou sua terapeuta IA. Como posso te ajudar hoje?' }]);
  }

  async function onEnd() {
    if (sessionId) {
      try { await endSession(sessionId); } catch {}
    }
    setActive(false);
    setSessionId(null);
    localStorage.removeItem('sessionId');
  }

  async function onSend() {
    if (!active) return;
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages(prev => [...prev, { from: 'user', text }]);

    try {
      const id = sessionId || localStorage.getItem('sessionId');
      if (!id) throw new Error('No session');
      const res = await sendChatMessage(id, text);
      setMessages(prev => [...prev, { from: 'bot', text: res.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { from: 'bot', text: 'Desculpe, ocorreu um erro ao responder. Tente novamente.' }]);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') onSend();
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "var(--background)" }}>
      {/* Botão de tema no canto superior direito */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      
      <div className="max-w-3xl mx-auto p-6 flex flex-col gap-4 min-h-screen">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{t('chat_with_ai')}</h1>
        <div className="flex gap-2">
          {!active ? (
            <button onClick={onStart} className="px-4 py-2 rounded font-medium" style={{ background: 'var(--cta)', color: '#4B4B4B', border: `1px solid var(--border-color)` }}>{t('start_conversation')}</button>
          ) : (
            <button onClick={onEnd} className="px-4 py-2 rounded border border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">{t('end_conversation')}</button>
          )}
        </div>
      </div>

      <div className="flex-1 rounded-xl border border-black/10 dark:border-white/10 p-4 space-y-3 overflow-auto bg-white/70 dark:bg-black/30">
        {messages.map((m, idx) => (
          <ChatMessage key={idx} from={m.from} text={m.text} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          disabled={!active}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t('type_message')}
          className="flex-1 px-4 py-3 rounded-xl border bg-transparent"
        />
        <button onClick={onSend} disabled={!active} className="px-4 py-3 rounded-xl disabled:opacity-60" style={{ background: 'var(--cta)', color: '#4B4B4B', border: `1px solid var(--border-color)` }}>{t('send')}</button>
      </div>
      </div>
    </div>
  );
} 