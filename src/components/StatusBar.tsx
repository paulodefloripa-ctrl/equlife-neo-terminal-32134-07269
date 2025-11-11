import { useEffect, useState } from 'react';
import { PomodoroState, GPSData } from '@/lib/types';
import { Clock, MapPin, Timer, Calendar, Volume2, VolumeX, Cloud } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';
import { useWeather } from '@/hooks/useWeather';
import { useAudioControl } from '@/hooks/useAudioControl';
import { Button } from './ui/button';
import ToolDock from './ToolDock';

type StatusBarProps = {
  pomodoro: PomodoroState;
  gps: GPSData;
};

const StatusBar = ({ pomodoro, gps }: StatusBarProps) => {
  const [time, setTime] = useState(new Date());
  const { language } = useLanguage();
  const t = getTranslation(language);
  const weather = useWeather(gps.latitude, gps.longitude);
  const { isMuted, toggleMute } = useAudioControl();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : language === 'it' ? 'it-IT' : language === 'pt' ? 'pt-PT' : 'es-ES', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : language === 'it' ? 'it-IT' : language === 'pt' ? 'pt-PT' : 'es-ES', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatPomodoro = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between w-full text-sm font-mono text-muted-foreground">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Clock size={14} />
          <span>{formatTime(time)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{formatDate(time)}</span>
        </div>

        {gps.authorized && (
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{gps.city || `${gps.latitude?.toFixed(2)}, ${gps.longitude?.toFixed(2)}`}</span>
          </div>
        )}

        {weather.temperature !== null && !weather.loading && (
          <div className="flex items-center gap-2">
            <Cloud size={14} />
            <span>
              {weather.icon} {weather.temperature}°C
            </span>
          </div>
        )}

        {pomodoro.isRunning && (
          <div className="flex items-center gap-2">
            <Timer size={14} className="text-accent" />
            <span className="text-accent">
              {pomodoro.mode === 'focus' ? t.status.focus : t.status.break}: {formatPomodoro(pomodoro.remainingSeconds)}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        
        <ToolDock />
      </div>
    </div>
  );
};

export default StatusBar;
