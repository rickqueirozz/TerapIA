"use client";
import React from "react";

type OptionPillProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export default function OptionPill({ active, className = "", style, ...props }: OptionPillProps) {
  return (
    <button
      {...props}
      className={`px-3 py-2 rounded-full border transition-colors duration-300 ${className}`}
      style={{
        borderColor: 'var(--border-color)',
        background: active ? 'var(--background-secondary)' : 'rgba(0,0,0,0.03)',
        color: 'var(--foreground)'
      }}
    />
  );
} 