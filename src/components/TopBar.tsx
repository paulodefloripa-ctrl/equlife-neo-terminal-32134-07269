import { Monitor, Glasses, Wifi, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { UIMode } from '@/lib/types';
import { useState, useEffect } from 'react';

interface TopBarProps {
  userName: string;
  uiMode: UIMode;
  onModeToggle: () => void;
}

const TopBar = ({ userName, uiMode, onModeToggle }: TopBarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`h-14 border-b border-border flex items-center justify-between px-6 ${
      uiMode === 'console' ? 'bg-card' : 'glass-effect'
    }`}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono">
            Usuario: <span className="text-primary font-semibold">{userName}</span>
          </span>
        </div>
        
        <div className="h-4 w-px bg-border" />
        
        <div className="flex items-center gap-2 text-sm">
          <Wifi className="w-4 h-4 text-secondary" />
          <span className="text-muted-foreground">Conectado</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-mono">
          <Clock className="w-4 h-4" />
          <span>{currentTime.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>

        <div className="h-4 w-px bg-border" />

        <Button
          variant="ghost"
          size="sm"
          onClick={onModeToggle}
          className="gap-2 font-mono text-xs"
          title="Ctrl+Alt+N para cambiar modo"
        >
          {uiMode === 'console' ? (
            <>
              <Monitor className="w-4 h-4" />
              <span>Consola</span>
            </>
          ) : (
            <>
              <Glasses className="w-4 h-4" />
              <span>Glass</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
