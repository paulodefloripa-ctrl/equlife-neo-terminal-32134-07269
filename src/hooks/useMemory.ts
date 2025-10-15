import { useState, useEffect } from 'react';
import { UIMode, Project } from '@/lib/types';

const STORAGE_KEYS = {
  UI_MODE: 'eql_ui_mode',
  VOICE_ON: 'eql_voice_on',
  LAST_COMMANDS: 'eql_last_commands',
  PROJECTS: 'eql_projects',
  USER_NAME: 'eql_user_name'
};

export const useMemory = () => {
  const [uiMode, setUiMode] = useState<UIMode>('console');
  const [voiceOn, setVoiceOn] = useState(true);
  const [lastCommands, setLastCommands] = useState<string[]>([]);

  useEffect(() => {
    // Load preferences from localStorage
    const savedMode = localStorage.getItem(STORAGE_KEYS.UI_MODE) as UIMode;
    const savedVoice = localStorage.getItem(STORAGE_KEYS.VOICE_ON);
    const savedCommands = localStorage.getItem(STORAGE_KEYS.LAST_COMMANDS);

    if (savedMode) setUiMode(savedMode);
    if (savedVoice !== null) setVoiceOn(savedVoice === 'true');
    if (savedCommands) setLastCommands(JSON.parse(savedCommands));
  }, []);

  const saveUiMode = (mode: UIMode) => {
    setUiMode(mode);
    localStorage.setItem(STORAGE_KEYS.UI_MODE, mode);
    document.body.classList.toggle('glass-mode', mode === 'glass');
  };

  const saveVoicePreference = (enabled: boolean) => {
    setVoiceOn(enabled);
    localStorage.setItem(STORAGE_KEYS.VOICE_ON, String(enabled));
  };

  const addCommand = (command: string) => {
    const updated = [command, ...lastCommands.slice(0, 19)]; // Keep last 20
    setLastCommands(updated);
    localStorage.setItem(STORAGE_KEYS.LAST_COMMANDS, JSON.stringify(updated));
  };

  const saveProjects = (projects: Project[]) => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  };

  const loadProjects = (): Project[] | null => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : null;
  };

  return {
    uiMode,
    voiceOn,
    lastCommands,
    saveUiMode,
    saveVoicePreference,
    addCommand,
    saveProjects,
    loadProjects
  };
};
