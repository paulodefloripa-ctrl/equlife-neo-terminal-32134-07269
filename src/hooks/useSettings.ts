import { useState, useEffect } from 'react';
import { SettingsData } from '@/lib/types';

const SETTINGS_KEY = 'eql-settings';

const defaultSettings: SettingsData = {
  theme: 'dark',
  backgroundImageUrl: '',
  stripeLinks: {
    starter: '',
    pro: '',
    enterprise: '',
  },
};

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
  }, []);

  const saveSettings = (newSettings: SettingsData) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  };

  return { settings, saveSettings };
};
