import { Calculator, Timer, Calendar, FileText, Search, MapPin, Globe, Mail, Music } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useState } from 'react';
import CalculatorModal from './tools/CalculatorModal';
import PomodoroModal from './tools/PomodoroModal';
import CalendarModal from './tools/CalendarModal';
import OCRModal from './tools/OCRModal';
import SearchModal from './tools/SearchModal';
import MapModal from './tools/MapModal';
import GmailModal from './tools/GmailModal';
import PDFModal from './tools/PDFModal';
import MusicModal from './tools/MusicModal';

const ToolDock = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const tools = [
    { id: 'gmail', icon: Mail, label: 'Gmail', component: GmailModal },
    { id: 'pdf', icon: FileText, label: 'PDF Editor', component: PDFModal },
    { id: 'pomodoro', icon: Timer, label: 'Pomodoro', component: PomodoroModal },
    { id: 'music', icon: Music, label: 'Music Player', component: MusicModal },
    { id: 'calendar', icon: Calendar, label: 'Calendar', component: CalendarModal },
    { id: 'calculator', icon: Calculator, label: 'Calculator', component: CalculatorModal },
    { id: 'ocr', icon: FileText, label: 'OCR', component: OCRModal },
    { id: 'search', icon: Search, label: 'Search', component: SearchModal },
    { id: 'map', icon: MapPin, label: 'GPS/Map', component: MapModal },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Tools</span>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56">
          {tools.slice(0, 4).map((tool) => (
            <DropdownMenuItem
              key={tool.id}
              onClick={() => setActiveModal(tool.id)}
              className="gap-2 cursor-pointer"
            >
              <tool.icon className="w-4 h-4" />
              {tool.label}
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          {tools.slice(4).map((tool) => (
            <DropdownMenuItem
              key={tool.id}
              onClick={() => setActiveModal(tool.id)}
              className="gap-2 cursor-pointer"
            >
              <tool.icon className="w-4 h-4" />
              {tool.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

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
