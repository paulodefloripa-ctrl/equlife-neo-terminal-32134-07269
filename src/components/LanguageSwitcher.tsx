import { Globe, ChevronDown } from 'lucide-react';
import { Language } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

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
    { id: 'de', label: 'DE' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 font-mono text-xs">
          <Globe className="w-4 h-4" />
          <span>{language.toUpperCase()}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover">
        {languages.map(lang => (
          <DropdownMenuItem 
            key={lang.id}
            onClick={() => onLanguageChange(lang.id)}
            className={`font-mono text-xs cursor-pointer ${
              language === lang.id ? 'bg-primary/10 text-primary' : ''
            }`}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
