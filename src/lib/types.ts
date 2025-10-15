export type UIMode = 'console' | 'glass';
export type Theme = 'dark' | 'light' | 'cyberpunk';

export type Project = {
  id: string;
  name: string;
  description?: string | null;
  agent?: string | null;
  status: 'EN_CURSO' | 'PAUSADO' | 'COMPLETADO';
  progress_percent?: number | null;
  capital_invested?: number | null;
  time_estimated_days?: number | null;
  created_at: string;
};

export type PomodoroState = {
  mode: 'focus' | 'break' | 'idle';
  remainingSeconds: number;
  isRunning: boolean;
};

export type GPSData = {
  latitude: number | null;
  longitude: number | null;
  city?: string | null;
  authorized: boolean;
};

export type ConsoleCommand = {
  command: string;
  handler: (args?: string) => string | Promise<string>;
  description: string;
};

export type SettingsData = {
  theme: Theme;
  backgroundImageUrl: string;
  stripeLinks: {
    starter: string;
    pro: string;
    enterprise: string;
  };
};

export interface ConversationMessage {
  id: string;
  type: 'user' | 'neo' | 'system';
  content: string;
  timestamp: Date;
  quickActions?: QuickAction[];
}

export interface QuickAction {
  id: string;
  label: string;
  command: string;
}

export interface ActivityLog {
  id: string;
  type: 'project_created' | 'project_updated' | 'neo_chat' | 'timer_start' | 'command_executed';
  description: string;
  timestamp: Date;
  status?: 'success' | 'warning' | 'error';
}

export interface Command {
  command: string;
  description: string;
  handler: (args?: string) => void;
}
