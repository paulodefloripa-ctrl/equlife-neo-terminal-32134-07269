import { useState } from 'react';
import { FileText, Mail, FileEdit, Timer, Music, Film, MapPin, Calendar, Clock } from 'lucide-react';
import { Button } from './ui/button';

type ActionButton = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

const QuickActionButtons = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const actions: ActionButton[] = [
    { id: 'projects', icon: <FileText className="w-3 h-3" />, label: 'Proyectos' },
    { id: 'gmail', icon: <Mail className="w-3 h-3" />, label: 'Gmail' },
    { id: 'pdf', icon: <FileEdit className="w-3 h-3" />, label: 'PDF' },
    { id: 'pomodoro', icon: <Timer className="w-3 h-3" />, label: 'Pomodoro' },
    { id: 'music', icon: <Music className="w-3 h-3" />, label: 'Música' },
    { id: 'media', icon: <Film className="w-3 h-3" />, label: 'Media' },
  ];

  return (
    <div className="flex flex-wrap gap-1 items-center justify-center mb-2">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs opacity-20 hover:opacity-40 transition-opacity bg-foreground/20"
          onClick={() => console.log(`Action: ${action.id}`)}
        >
          {action.icon}
          <span className="ml-1">{action.label}</span>
        </Button>
      ))}
      
      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2 text-xs opacity-20 hover:opacity-40 transition-opacity bg-foreground/20"
        onClick={() => setCurrentTime(new Date())}
      >
        <Clock className="w-3 h-3 mr-1" />
        {currentTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2 text-xs opacity-20 hover:opacity-40 transition-opacity bg-foreground/20"
        onClick={() => setCurrentTime(new Date())}
      >
        <Calendar className="w-3 h-3 mr-1" />
        {currentTime.toLocaleDateString('es-ES')}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2 text-xs opacity-20 hover:opacity-40 transition-opacity bg-foreground/20"
        onClick={getLocation}
      >
        <MapPin className="w-3 h-3 mr-1" />
        {location ? `${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}` : 'Ubicación'}
      </Button>
    </div>
  );
};

export default QuickActionButtons;
