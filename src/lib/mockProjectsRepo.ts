import { Project } from './types';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'EQL Nano Console',
    description: 'Minimal operational console',
    agent: 'Neo',
    status: 'EN_CURSO',
    progress_percent: 65,
    capital_invested: 5000,
    time_estimated_days: 30,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'EquityLabs Platform',
    description: 'Main platform development',
    agent: 'Grok',
    status: 'PAUSADO',
    progress_percent: 40,
    capital_invested: 12000,
    time_estimated_days: 90,
    created_at: new Date().toISOString(),
  },
];

export const listProjects = async (): Promise<Project[]> => {
  return [...mockProjects];
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at'>): Promise<Project> => {
  const newProject: Project = {
    ...project,
    id: String(mockProjects.length + 1),
    created_at: new Date().toISOString(),
  };
  mockProjects.push(newProject);
  return newProject;
};

export const updateProject = async (id: string, patch: Partial<Project>): Promise<Project> => {
  const index = mockProjects.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Project not found');
  mockProjects[index] = { ...mockProjects[index], ...patch };
  return mockProjects[index];
};
