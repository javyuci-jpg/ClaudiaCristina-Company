// components/LanguageProvider.tsx
"use client";

import { useEffect } from "react";
import i18n from "../i18n";

export default function LanguageProvider({ locale }: { locale: string }) {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return null; // no renderiza nada, solo sincroniza idioma
}