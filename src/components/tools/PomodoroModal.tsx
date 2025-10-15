import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface PomodoroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PomodoroModal = ({ isOpen, onClose }: PomodoroModalProps) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && isOpen) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false);
            if (isBreak) {
              setMinutes(25);
              setIsBreak(false);
            } else {
              setMinutes(5);
              setIsBreak(true);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, isOpen]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="font-mono">
        <DialogHeader>
          <DialogTitle className="text-primary">
            ⏱️ Pomodoro {isBreak ? '(Descanso)' : '(Trabajo)'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-card p-8 rounded border border-border text-center">
            <div className="text-6xl font-mono text-primary">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <Button
              onClick={toggleTimer}
              size="lg"
              className="gap-2"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isActive ? 'Pausar' : 'Iniciar'}
            </Button>

            <Button
              onClick={resetTimer}
              size="lg"
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            {isActive ? 'Timer activo' : 'Timer pausado'}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PomodoroModal;
