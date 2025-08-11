"use client";
import React from "react";

type QuestionCardProps = {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function QuestionCard({ title, children, footer }: QuestionCardProps) {
  return (
    <div
      className="w-full rounded-2xl p-6 shadow"
      style={{
        border: `1px solid var(--border-color)`,
        background: 'var(--background-secondary)',
        color: 'var(--foreground)',
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
      }}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
      {footer && <div className="mt-6 flex justify-between items-center">{footer}</div>}
    </div>
  );
} 