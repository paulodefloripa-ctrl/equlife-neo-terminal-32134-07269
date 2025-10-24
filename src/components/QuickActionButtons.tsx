import { Button } from './ui/button';
import { FolderKanban, Mail, FileText, Timer, Music, Film } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';

type ActionButton = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

const QuickActionButtons = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const actions: ActionButton[] = [
    { id: 'projects', icon: <FolderKanban size={14} />, label: t.actions.projects },
    { id: 'gmail', icon: <Mail size={14} />, label: t.actions.gmail },
    { id: 'pdf', icon: <FileText size={14} />, label: t.actions.pdf },
    { id: 'pomodoro', icon: <Timer size={14} />, label: t.actions.pomodoro },
    { id: 'music', icon: <Music size={14} />, label: t.actions.music },
    { id: 'media', icon: <Film size={14} />, label: t.actions.media },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs opacity-40 hover:opacity-60 transition-opacity bg-background/20"
        >
          {action.icon}
          <span className="ml-1.5">{action.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActionButtons;
