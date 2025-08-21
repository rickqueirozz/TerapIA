"use client";
import React from "react";

type TriageButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "cta" | "neutral";
};

export default function TriageButton({ variant = "cta", className = "", style, ...props }: TriageButtonProps) {
  const base: React.CSSProperties = variant === "cta"
    ? { 
        background: 'linear-gradient(135deg, #F59E0B, #FCD34D)', 
        color: 'white', 
        border: '2px solid #F59E0B',
        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
      }
    : { 
        background: 'rgba(255, 255, 255, 0.9)', 
        color: '#4B5563', 
        border: '2px solid #FCD34D',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      };

  return (
    <button
      {...props}
      className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 font-poppins ${className}`}
      style={{ ...base, ...style }}
    />
  );
} 