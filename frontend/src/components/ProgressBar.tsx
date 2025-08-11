"use client";
import React from "react";

type ProgressBarProps = {
  value: number; // 0..1
};

export default function ProgressBar({ value }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  return (
    <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
      <div
        className="h-full transition-all duration-300"
        style={{ width: `${pct}%`, background: 'var(--cta)' }}
      />
    </div>
  );
} 