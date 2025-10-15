import { useState, useEffect, useRef } from 'react';
import { PomodoroState } from '@/lib/types';

export const usePomodoro = () => {
  const [state, setState] = useState<PomodoroState>({
    mode: 'idle',
    remainingSeconds: 0,
    isRunning: false,
  });
  
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (state.isRunning && state.remainingSeconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setState(prev => ({
          ...prev,
          remainingSeconds: Math.max(0, prev.remainingSeconds - 1),
        }));
      }, 1000);
    } else if (state.remainingSeconds === 0 && state.isRunning) {
      setState(prev => ({ ...prev, isRunning: false }));
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isRunning, state.remainingSeconds]);

  const startFocus = (minutes: number) => {
    setState({
      mode: 'focus',
      remainingSeconds: minutes * 60,
      isRunning: true,
    });
  };

  const startBreak = (minutes: number) => {
    setState({
      mode: 'break',
      remainingSeconds: minutes * 60,
      isRunning: true,
    });
  };

  const stop = () => {
    setState({
      mode: 'idle',
      remainingSeconds: 0,
      isRunning: false,
    });
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return { state, startFocus, startBreak, stop };
};
