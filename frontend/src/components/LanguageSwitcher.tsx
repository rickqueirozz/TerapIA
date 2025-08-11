"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  return (
    <select
      aria-label="Idioma"
      className="px-2 py-1 rounded-md bg-transparent border border-black/10 dark:border-white/10"
      value={locale}
      onChange={(e) => setLocale(e.target.value as 'pt' | 'en')}
    >
      <option value="pt">Português</option>
      <option value="en">English</option>
    </select>
  );
} 