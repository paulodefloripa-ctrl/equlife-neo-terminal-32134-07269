import { useState, useEffect } from 'react';
import { Theme } from '@/lib/types';

const THEME_KEY = 'eql-theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme;
    if (saved && ['dark', 'light', 'cyberpunk'].includes(saved)) {
      applyTheme(saved);
    } else {
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    
    document.body.classList.remove('dark', 'light', 'cyberpunk');
    document.body.classList.add(newTheme);
  };

  const changeTheme = (newTheme: Theme) => {
    applyTheme(newTheme);
  };

  return { theme, changeTheme };
};
