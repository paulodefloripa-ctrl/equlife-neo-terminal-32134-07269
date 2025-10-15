import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Terminal, FolderKanban, Bot, Settings } from 'lucide-react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import HubNode from '@/components/HubNode';

const Home = () => {
  const navigate = useNavigate();
  const { theme, changeTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Animated background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      
      <div className="absolute top-4 right-4 z-50">
        <ThemeSwitcher theme={theme} onThemeChange={changeTheme} />
      </div>

      {/* Central Hub */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-12 px-4 max-w-5xl relative z-10"
      >
        {/* Logo Central */}
        <div className="flex flex-col items-center justify-center gap-6 mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="absolute inset-0 cyan-glow rounded-full" />
            <div className="relative w-32 h-32 rounded-full border-4 border-primary bg-background/50 backdrop-blur-sm flex items-center justify-center">
              <Brain className="w-16 h-16 text-primary" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-7xl font-bold font-mono cyan-text-glow"
          >
            EquityLabs
          </motion.h1>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-primary/80 font-mono"
        >
          Núcleo Comunicacional del Futuro
        </motion.p>
        
        {/* Navigation Nodes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-16 mb-12"
        >
          <HubNode to="/console" icon={Terminal} label="Console" delay={0.8} />
          <HubNode to="/projects" icon={FolderKanban} label="Projects" delay={0.9} />
          <HubNode to="/agents" icon={Bot} label="Agents" delay={1.0} />
          <HubNode to="/settings" icon={Settings} label="Settings" delay={1.1} />
        </motion.div>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="space-y-4"
        >
          <Button
            onClick={() => navigate('/console')}
            size="lg"
            className="text-xl px-12 py-6 font-mono cyan-border-animated pulse-cyan bg-background/50 hover:bg-primary/10 text-primary border-2 border-primary transition-all"
          >
            &gt; ACTIVAR SISTEMA
          </Button>
          
          <p className="text-sm text-primary/60 font-mono">
            Presiona para ingresar al sistema
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-primary/60 text-xs font-mono pt-8"
        >
          <span className="cursor-blink">_</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
