import { useState, useEffect } from 'react';
import { Theme } from '@/lib/types';

const THEME_KEY = 'eql-theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme;
    if (saved && ['light', 'cyberpunk'].includes(saved)) {
      applyTheme(saved);
    } else {
      applyTheme('light');
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
