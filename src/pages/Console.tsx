import { useState } from 'react';
import { useFRE } from '@/hooks/useFRE';
import { FRETerminal } from '@/components/FRETerminal';
import Layout from '@/components/Layout';
import StatusBar from '@/components/StatusBar';
import EnhancedInput from '@/components/EnhancedInput';
import SpaceAnimation from '@/components/SpaceAnimation';
import { usePomodoro } from '@/hooks/usePomodoro';
import { useGPS } from '@/hooks/useGPS';
import { ConsoleCommand } from '@/lib/types';
import { listProjects } from '@/lib/projectsRepo';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoice } from '@/hooks/useVoice';

interface ChatMessage {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
}

const Console = () => {
  const { hasCompletedFRE } = useFRE();
  const { state: pomodoro, startFocus, startBreak, stop } = usePomodoro();
  const { gps, requestLocation } = useGPS();
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { speak } = useVoice();

  const addMessage = (type: 'agent' | 'system' | 'user', content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString() + Math.random(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const commands: ConsoleCommand[] = [
    {
      command: 'help',
      description: t.commands.help,
      handler: () => {
        const helpText = commands.map(c => `${c.command} - ${c.description}`).join('\n');
        return helpText;
      },
    },
    {
      command: 'time',
      description: t.commands.time,
      handler: () => {
        return new Date().toLocaleString(language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : language === 'it' ? 'it-IT' : language === 'pt' ? 'pt-PT' : 'es-ES');
      },
    },
    {
      command: 'gps',
      description: t.commands.gps,
      handler: () => {
        requestLocation();
        return 'Requesting GPS location...';
      },
    },
    {
      command: 'focus',
      description: t.commands.focus,
      handler: (args) => {
        const minutes = parseInt(args || '25');
        startFocus(minutes);
        return `Focus timer started: ${minutes} minutes`;
      },
    },
    {
      command: 'break',
      description: t.commands.break,
      handler: (args) => {
        const minutes = parseInt(args || '5');
        startBreak(minutes);
        return `Break timer started: ${minutes} minutes`;
      },
    },
    {
      command: 'stop',
      description: t.commands.stop,
      handler: () => {
        stop();
        return 'Timer stopped';
      },
    },
    {
      command: 'projects',
      description: t.commands.projects,
      handler: async () => {
        try {
          const projects = await listProjects();
          const list = projects.map(p => `- ${p.name} (${p.status}) - ${p.progress_percent || 0}%`).join('\n');
          return `Projects:\n${list}`;
        } catch (e: any) {
          return `Error: ${e.message}`;
        }
      },
    },
  ];

  const handleExecute = async (cmd: string, args?: string) => {
    const command = commands.find(c => c.command === cmd);
    if (command) {
      const result = await Promise.resolve(command.handler(args));
      addMessage('agent', result);
    } else {
      addMessage('system', `Unknown command: ${cmd}`);
    }
  };

  const handleEnhancedInput = (text: string, file?: File) => {
    if (text) {
      addMessage('user', text);
      
      // Check if it's a command (starts with /)
      if (text.startsWith('/')) {
        const [cmd, ...argsParts] = text.slice(1).trim().split(' ');
        const args = argsParts.join(' ');
        handleExecute(cmd, args);
      } else {
        // Regular message - echo for now
        setTimeout(() => {
          addMessage('agent', `Echo: ${text}`);
        }, 500);
      }
    }
    
    if (file) {
      addMessage('system', `File received: ${file.name}`);
    }
  };

  // Show FRE if not completed
  if (!hasCompletedFRE) {
    return (
      <Layout menuDisabled={true}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <FRETerminal />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
        {/* Space animation background */}
        <SpaceAnimation className="absolute inset-0 -z-10" />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto p-4 flex flex-col h-full">
          <div className="mb-4">
            <StatusBar pomodoro={pomodoro} gps={gps} />
          </div>
          
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground font-mono text-sm opacity-60">
                  {t.welcomeMessage}
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-w-4xl mx-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-primary/20 text-foreground border border-primary/30'
                          : msg.type === 'agent'
                          ? 'bg-muted/80 text-foreground backdrop-blur-sm'
                          : 'bg-card/80 text-muted-foreground backdrop-blur-sm'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-mono text-sm whitespace-pre-wrap">{msg.content}</span>
                        {msg.type === 'agent' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 shrink-0"
                            onClick={() => speak(msg.content)}
                          >
                            <Volume2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="w-full max-w-2xl mx-auto">
            <EnhancedInput onSubmit={handleEnhancedInput} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Console;
