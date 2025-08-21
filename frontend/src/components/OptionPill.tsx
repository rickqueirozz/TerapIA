"use client";
import React from "react";

type OptionPillProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export default function OptionPill({ active, className = "", style, ...props }: OptionPillProps) {
  return (
    <button
      {...props}
      className={`px-6 py-3 rounded-2xl border-2 font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
      style={{
        borderColor: active ? '#F59E0B' : '#FCD34D',
        background: active ? 'linear-gradient(135deg, #F59E0B, #FCD34D)' : 'rgba(255, 255, 255, 0.9)',
        color: active ? 'white' : '#4B5563',
        boxShadow: active ? '0 4px 12px rgba(245, 158, 11, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    />
  );
} 