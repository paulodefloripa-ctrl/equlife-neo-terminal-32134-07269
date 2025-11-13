import { useState, useEffect } from 'react';
import { FREState, ClientProfile } from '@/lib/types';
import { detectTools } from '@/lib/toolDetector';
import { useLanguage } from './useLanguage';
import { z } from 'zod';

const FRE_KEY = 'eql-fre-state';

// Validation schema for profile fields
const profileFieldSchema = z.string().trim().max(500, 'Input is too long (max 500 characters)');

const defaultFREState: FREState = {
  hasCompletedFRE: false,
  skipOnboarding: false,
  profile: null,
  currentStep: 0,
  pivotExit: false,
};

export const useFRE = () => {
  const { language } = useLanguage();
  const [freState, setFreState] = useState<FREState>(defaultFREState);

  useEffect(() => {
    const stored = localStorage.getItem(FRE_KEY);
    if (stored) {
      try {
        setFreState(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse FRE state', e);
      }
    }
  }, []);

  const saveFREState = (newState: Partial<FREState>) => {
    const updated = { ...freState, ...newState };
    setFreState(updated);
    localStorage.setItem(FRE_KEY, JSON.stringify(updated));
  };

  const initializeProfile = (): ClientProfile => {
    return {
      nombre: '',
      rango_edad: '',
      ciudad: '',
      rol_principal: '',
      tamano_equipo: '',
      objetivo_inmediato: '',
      desafio_mayor: '',
      nivel_tecnico: '',
      herramientas_vitales: '',
      tools_detected: [],
      completed_at: '',
      language: language,
    };
  };

  const skipOnboarding = () => {
    saveFREState({
      hasCompletedFRE: true,
      skipOnboarding: true,
    });
  };

  const startOnboarding = () => {
    saveFREState({
      profile: initializeProfile(),
      currentStep: 1,
    });
  };

  const saveAnswer = (field: keyof ClientProfile, value: string) => {
    if (!freState.profile) return;
    
    // Validate input (skip validation for non-string fields)
    if (typeof value === 'string') {
      const result = profileFieldSchema.safeParse(value);
      if (!result.success) {
        console.warn('Invalid profile field value:', result.error.errors[0].message);
        return;
      }
    }
    
    const updatedProfile = {
      ...freState.profile,
      [field]: value,
    };

    // Auto-detect tools from Q9
    if (field === 'herramientas_vitales') {
      updatedProfile.tools_detected = detectTools(value);
    }

    saveFREState({
      profile: updatedProfile,
    });
  };

  const nextStep = () => {
    saveFREState({
      currentStep: freState.currentStep + 1,
    });
  };

  const setPivotExit = () => {
    saveFREState({
      pivotExit: true,
      hasCompletedFRE: true,
      profile: freState.profile ? {
        ...freState.profile,
        completed_at: new Date().toISOString(),
      } : null,
    });
  };

  const completeOnboarding = () => {
    saveFREState({
      hasCompletedFRE: true,
      profile: freState.profile ? {
        ...freState.profile,
        completed_at: new Date().toISOString(),
      } : null,
    });
  };

  const resetFRE = () => {
    localStorage.removeItem(FRE_KEY);
    setFreState(defaultFREState);
  };

  return {
    freState,
    hasCompletedFRE: freState.hasCompletedFRE,
    profile: freState.profile,
    currentStep: freState.currentStep,
    skipOnboarding,
    startOnboarding,
    saveAnswer,
    nextStep,
    setPivotExit,
    completeOnboarding,
    resetFRE,
  };
};
