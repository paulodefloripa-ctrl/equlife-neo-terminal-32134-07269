import { Calculator, Timer, Calendar, FileText, Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useState } from 'react';
import CalculatorModal from './tools/CalculatorModal';
import PomodoroModal from './tools/PomodoroModal';
import CalendarModal from './tools/CalendarModal';
import OCRModal from './tools/OCRModal';
import SearchModal from './tools/SearchModal';
import MapModal from './tools/MapModal';

const ToolDock = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const tools = [
    { id: 'calculator', icon: Calculator, label: 'Calculadora', component: CalculatorModal },
    { id: 'pomodoro', icon: Timer, label: 'Pomodoro', component: PomodoroModal },
    { id: 'calendar', icon: Calendar, label: 'Agenda', component: CalendarModal },
    { id: 'ocr', icon: FileText, label: 'OCR/Docs', component: OCRModal },
    { id: 'search', icon: Search, label: 'Buscador IA', component: SearchModal },
    { id: 'map', icon: MapPin, label: 'GPS/Mapa', component: MapModal },
  ];

  return (
    <>
      <TooltipProvider>
        <div className="w-16 border-l border-border bg-card flex flex-col gap-2 p-2">
          {tools.map((tool) => (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveModal(tool.id)}
                  className="w-full h-12 hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <tool.icon className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="font-mono">
                {tool.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      {tools.map((tool) => {
        const ModalComponent = tool.component;
        return (
          <ModalComponent
            key={tool.id}
            isOpen={activeModal === tool.id}
            onClose={() => setActiveModal(null)}
          />
        );
      })}
    </>
  );
};

export default ToolDock;
