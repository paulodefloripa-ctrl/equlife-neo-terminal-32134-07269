export type UIMode = 'console' | 'glass';
export type Theme = 'normal' | 'cyberpunk';
export type Language = 'en' | 'es' | 'fr' | 'it' | 'pt' | 'de';

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

export interface ClientProfile {
  nombre: string;
  rango_edad: string;
  ciudad: string;
  rol_principal: string;
  tamano_equipo: string;
  objetivo_inmediato: string;
  desafio_mayor: string;
  nivel_tecnico: string;
  herramientas_vitales: string;
  tools_detected: string[];
  completed_at: string;
  language: string;
}

export interface FREState {
  hasCompletedFRE: boolean;
  skipOnboarding: boolean;
  profile: ClientProfile | null;
  currentStep: number;
  pivotExit: boolean;
}

export interface IntegrationCard {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: 'not_connected' | 'connected' | 'recommended';
  oauth_url?: string;
  docs_url: string;
}
