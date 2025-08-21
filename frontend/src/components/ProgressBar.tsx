"use client";
import React from "react";

type ProgressBarProps = {
  value: number; // 0..1
};

export default function ProgressBar({ value }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  return (
    <div className="w-full h-4 rounded-full overflow-hidden bg-amber-100 border-2 border-amber-200 shadow-inner">
      <div
        className="h-full transition-all duration-500 ease-out rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
} 