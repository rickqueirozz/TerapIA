"use client";
import React from "react";

type ChatMessageProps = {
  from: "user" | "bot";
  text: string;
};

export default function ChatMessage({ from, text }: ChatMessageProps) {
  const isBot = from === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed shadow ${
          isBot ? "" : ""
        }`}
        style={{
          background: isBot ? 'var(--background-secondary)' : 'rgba(0,0,0,0.03)',
          color: 'var(--foreground)',
          border: `1px solid var(--border-color)`
        }}
      >
        {text}
      </div>
    </div>
  );
}