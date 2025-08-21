"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem("theme");
    const isDarkMode = theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(isDarkMode);
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-100 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full transition-all duration-300 ease-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
      style={{
        background: isDark 
          ? "linear-gradient(135deg, #1f2937 0%, #374151 100%)"
          : "linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)",
        boxShadow: isDark
          ? "0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          : "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)"
      }}
      aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Sol */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isDark ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-amber-500"
          >
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        
        {/* Lua */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="text-slate-300"
          >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      
      {/* Brilho ao redor */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isDark ? "opacity-0" : "opacity-30"
        }`}
        style={{
          background: "radial-gradient(circle at center, rgba(245, 158, 11, 0.2) 0%, transparent 70%)",
          animation: isDark ? "none" : "pulse 2s infinite"
        }}
      />
    </button>
  );
} 