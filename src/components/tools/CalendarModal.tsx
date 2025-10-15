import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarModal = ({ isOpen, onClose }: CalendarModalProps) => {
  const mockEvents = [
    { id: 1, title: 'Reunión con equipo', time: '10:00', date: 'Hoy' },
    { id: 2, title: 'Review proyecto EQL-Comms', time: '15:30', date: 'Hoy' },
    { id: 3, title: 'Call con cliente', time: '09:00', date: 'Mañana' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="font-mono">
        <DialogHeader>
          <DialogTitle className="text-primary">🗓️ Agenda próximos eventos</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 bg-card border border-border rounded hover:border-primary transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-primary">{event.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{event.time}</div>
                </div>
                <div className="text-xs text-secondary">{event.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground mt-4">
          Próximamente: integración con calendario completo
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
