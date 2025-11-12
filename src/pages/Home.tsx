import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Terminal, FolderKanban, Bot, Settings } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import HubNode from '@/components/HubNode';

const Home = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const t = getTranslation(language);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher language={language} onLanguageChange={changeLanguage} />
      </div>

      {/* Central Hub */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-12 px-4 max-w-5xl relative z-10"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl text-foreground font-sans max-w-3xl mx-auto"
        >
          {t.hero}
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
            onClick={() => {
              localStorage.setItem('eql-fre-state', JSON.stringify({
                hasCompletedFRE: true,
                skipOnboarding: true,
                profile: null,
                currentStep: 0,
                pivotExit: false,
              }));
              navigate('/console');
            }}
            size="lg"
            className="text-xl px-12 py-6 font-sans bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
          >
            {t.start}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
