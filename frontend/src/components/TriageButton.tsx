"use client";
import React from "react";

type TriageButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "cta" | "neutral";
};

export default function TriageButton({ variant = "cta", className = "", style, ...props }: TriageButtonProps) {
  const base: React.CSSProperties = variant === "cta"
    ? { background: 'var(--cta)', color: '#4B4B4B', border: '1px solid var(--border-color)' }
    : { background: 'var(--background-secondary)', color: 'var(--foreground)', border: '1px solid var(--border-color)' };

  return (
    <button
      {...props}
      className={`px-4 py-2 rounded font-medium transition-colors duration-300 ${className}`}
      style={{ ...base, ...style }}
      onMouseEnter={(e) => {
        if (variant === 'cta') (e.currentTarget as HTMLButtonElement).style.background = '#FFD966';
      }}
      onMouseLeave={(e) => {
        if (variant === 'cta') (e.currentTarget as HTMLButtonElement).style.background = 'var(--cta)';
      }}
    />
  );
} 