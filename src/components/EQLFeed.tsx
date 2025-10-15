import { ActivityLog } from '@/lib/types';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EQLFeedProps {
  activities: ActivityLog[];
}

const EQLFeed = ({ activities }: EQLFeedProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'project_created': return '📦';
      case 'project_updated': return '📝';
      case 'neo_chat': return '💬';
      case 'timer_start': return '⏱️';
      case 'command_executed': return '⚡';
      default: return '•';
    }
  };

  const getStatusColor = (status?: ActivityLog['status']) => {
    switch (status) {
      case 'success': return 'text-secondary';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-l border-border bg-card overflow-hidden"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-mono font-semibold text-primary">EQL Feed</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-8rem)] p-4 space-y-3">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 bg-background border border-border rounded text-sm"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{getActivityIcon(activity.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground mb-1">
                        {activity.timestamp.toLocaleTimeString('es-AR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className={`text-xs font-mono ${getStatusColor(activity.status)}`}>
                        {activity.description}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="fixed right-4 top-20 z-10"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      )}
    </>
  );
};

export default EQLFeed;
