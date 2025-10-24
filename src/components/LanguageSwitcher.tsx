import { Globe } from 'lucide-react';
import { Language } from '@/lib/types';

type LanguageSwitcherProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

const LanguageSwitcher = ({ language, onLanguageChange }: LanguageSwitcherProps) => {
  const languages: { id: Language; label: string }[] = [
    { id: 'en', label: 'EN' },
    { id: 'es', label: 'ES' },
    { id: 'fr', label: 'FR' },
    { id: 'it', label: 'IT' },
    { id: 'pt', label: 'PT' },
  ];

  return (
    <div className="flex gap-1 rounded-lg bg-background/50 border border-border p-1">
      <Globe size={14} className="text-muted-foreground my-auto ml-2" />
      {languages.map(lang => (
        <button
          key={lang.id}
          onClick={() => onLanguageChange(lang.id)}
          className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
            language === lang.id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
