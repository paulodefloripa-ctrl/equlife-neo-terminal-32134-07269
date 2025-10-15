import { supabase } from './supabase';
import { Project } from './types';
import * as mockRepo from './mockProjectsRepo';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

export const listProjects = async (): Promise<Project[]> => {
  if (useMock) return mockRepo.listProjects();
  
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at'>): Promise<Project> => {
  if (useMock) return mockRepo.createProject(project);
  
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProject = async (id: string, patch: Partial<Project>): Promise<Project> => {
  if (useMock) return mockRepo.updateProject(id, patch);
  
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('projects')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
