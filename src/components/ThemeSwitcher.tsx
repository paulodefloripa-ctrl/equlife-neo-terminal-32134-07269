import { Moon, Sun, Zap } from 'lucide-react';
import { Theme } from '@/lib/types';

type ThemeSwitcherProps = {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
};

const ThemeSwitcher = ({ theme, onThemeChange }: ThemeSwitcherProps) => {
  const themes: { id: Theme; label: string; icon: React.ReactNode }[] = [
    { id: 'normal', label: 'Normal', icon: <Sun size={14} /> },
    { id: 'cyberpunk', label: 'Cyber', icon: <Zap size={14} /> },
  ];

  return (
    <div className="flex gap-1 rounded-lg bg-background/50 border border-border p-1">
      {themes.map(t => (
        <button
          key={t.id}
          onClick={() => onThemeChange(t.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs transition-all ${
            theme === t.id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          {t.icon}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
