import { useState, useEffect } from 'react';

interface AudioControl {
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
}

export const useAudioControl = (): AudioControl => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('audioMuted');
    return saved === 'true';
  });
  
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem('audioVolume');
    return saved ? parseFloat(saved) : 1.0;
  });

  useEffect(() => {
    // Apply mute/volume to all audio and video elements
    const applyAudioSettings = () => {
      const mediaElements = document.querySelectorAll<HTMLMediaElement>('audio, video');
      mediaElements.forEach(element => {
        element.muted = isMuted;
        if (!isMuted) {
          element.volume = volume;
        }
      });
    };

    applyAudioSettings();

    // Observer for dynamically added media elements
    const observer = new MutationObserver(applyAudioSettings);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [isMuted, volume]);

  const toggleMute = () => {
    setIsMuted(prev => {
      const newValue = !prev;
      localStorage.setItem('audioMuted', String(newValue));
      return newValue;
    });
  };

  const setVolume = (vol: number) => {
    const clampedVolume = Math.max(0, Math.min(1, vol));
    setVolumeState(clampedVolume);
    localStorage.setItem('audioVolume', String(clampedVolume));
  };

  return { isMuted, volume, toggleMute, setVolume };
};
