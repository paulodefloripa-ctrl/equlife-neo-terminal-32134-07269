import { useState, useEffect } from 'react';
import { Language } from '@/lib/i18n';

const LANGUAGE_KEY = 'eql-language';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY) as Language;
    if (saved && ['en', 'es', 'fr', 'it', 'pt'].includes(saved)) {
      setLanguage(saved);
    } else {
      setLanguage('es');
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_KEY, newLanguage);
  };

  return { language, changeLanguage };
};
