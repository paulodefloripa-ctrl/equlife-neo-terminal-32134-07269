import { useState, useEffect } from 'react';
import { Language } from '@/lib/i18n';

const LANGUAGE_KEY = 'eql-language';

const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('pt')) return 'pt';
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('it')) return 'it';
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('de')) return 'de';
  
  return 'en'; // default fallback
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY) as Language;
    if (saved && ['en', 'es', 'fr', 'it', 'pt', 'de'].includes(saved)) {
      setLanguage(saved);
    } else {
      const detected = detectBrowserLanguage();
      setLanguage(detected);
      localStorage.setItem(LANGUAGE_KEY, detected);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_KEY, newLanguage);
  };

  return { language, changeLanguage };
};
