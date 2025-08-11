"use client";
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import pt from '@/i18n/pt.json';
import en from '@/i18n/en.json';

type Dict = Record<string, string>;
const LOCALES = { pt, en } as const;

type I18nContextType = {
  locale: keyof typeof LOCALES;
  setLocale: (loc: keyof typeof LOCALES) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType>({
  locale: 'pt',
  setLocale: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<keyof typeof LOCALES>('pt');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (stored && (stored === 'pt' || stored === 'en')) {
      setLocaleState(stored as 'pt' | 'en');
    }
  }, []);

  function setLocale(loc: keyof typeof LOCALES) {
    setLocaleState(loc);
    localStorage.setItem('locale', loc);
    document.documentElement.lang = loc;
  }

  const dict: Dict = useMemo(() => (LOCALES[locale] as Dict) || (LOCALES.pt as Dict), [locale]);
  const t = useCallback((key: string) => dict[key] ?? key, [dict]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() { return useContext(I18nContext); } 