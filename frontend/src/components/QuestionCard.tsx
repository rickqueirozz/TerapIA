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
      className="w-full rounded-3xl p-8 shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-2"
      style={{
        borderColor: '#FCD34D',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(251, 191, 36, 0.15)'
      }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 font-poppins">{title}</h2>
      <div className="space-y-4">{children}</div>
      {footer && <div className="mt-6 flex justify-between items-center">{footer}</div>}
    </div>
  );
} 