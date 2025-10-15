import { QuickAction } from '@/lib/types';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface QuickActionsProps {
  actions: QuickAction[];
  onAction: (action: QuickAction) => void;
}

const QuickActions = ({ actions, onAction }: QuickActionsProps) => {
  return (
    <div className="border-t border-border p-4">
      <div className="flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAction(action)}
              className="font-mono text-xs hover:bg-primary hover:text-primary-foreground transition-all"
            >
              {action.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
