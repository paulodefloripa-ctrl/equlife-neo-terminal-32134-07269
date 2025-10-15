import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeScreenProps {
  onActivate: () => void;
}

const WelcomeScreen = ({ onActivate }: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[hsl(var(--console-bg-start))] to-[hsl(var(--console-bg-end))] console-scanlines"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center space-y-8"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Zap className="w-16 h-16 text-primary cyan-glow" />
          <h1 className="text-6xl font-bold text-primary cyan-text-glow">
            EquityLabs
          </h1>
        </div>
        
        <p className="text-xl text-secondary max-w-2xl mx-auto px-4">
          Bienvenido al núcleo comunicacional del futuro
        </p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={onActivate}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-xl px-12 py-6 cyan-border-animated pulse-cyan font-mono"
          >
            &gt; ACTIVAR NEO
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-muted-foreground text-sm font-mono"
        >
          <span className="cursor-blink">_</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
