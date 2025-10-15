import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HubNodeProps {
  to: string;
  icon: LucideIcon;
  label: string;
  delay?: number;
}

const HubNode = ({ to, icon: Icon, label, delay = 0 }: HubNodeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <Link
        to={to}
        className="relative group"
      >
        {/* Glow effect container */}
        <div className="absolute inset-0 rounded-full cyan-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Node circle */}
        <div className="relative w-24 h-24 rounded-full border-2 border-primary bg-background/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:scale-110">
          <Icon className="w-10 h-10 text-primary group-hover:text-primary transition-colors" />
        </div>
        
        {/* Connection line to center */}
        <div className="absolute top-1/2 left-1/2 w-px h-20 bg-gradient-to-b from-primary/50 to-transparent -translate-x-1/2 opacity-30 group-hover:opacity-60 transition-opacity" />
      </Link>
      
      <p className="mt-4 text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">
        {label}
      </p>
    </motion.div>
  );
};

export default HubNode;
