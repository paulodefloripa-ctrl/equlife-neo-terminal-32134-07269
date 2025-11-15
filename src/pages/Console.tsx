import { useState, useRef, useEffect } from 'react';
import { useFRE } from '@/hooks/useFRE';
import { FRETerminal } from '@/components/FRETerminal';
import Layout from '@/components/Layout';
import { usePomodoro } from '@/hooks/usePomodoro';
import { useGPS } from '@/hooks/useGPS';
import { ConsoleCommand } from '@/lib/types';
import { listProjects } from '@/lib/projectsRepo';
import { useLanguage } from '@/hooks/useLanguage';
import { getTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { useTypingEffect } from '@/hooks/useTypingEffect';

interface ChatMessage {
  id: string;
  type: 'user' | 'system';
  content: string;
  options?: string[];
  timestamp: Date;
}

const Console = () => {
  const { hasCompletedFRE } = useFRE();
  const { state: pomodoro, startFocus, startBreak, stop } = usePomodoro();
  const { gps, requestLocation } = useGPS();
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (type: 'system' | 'user', content: string, options?: string[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString() + Math.random(),
      type,
      content,
      options,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const commands: ConsoleCommand[] = [
    {
      command: 'help',
      description: t.commands.help,
      handler: () => {
        const helpText = commands.map(c => `/${c.command} - ${c.description}`).join('\n');
        return `Available commands:\n${helpText}`;
      },
    },
    {
      command: 'time',
      description: t.commands.time,
      handler: () => {
        return `Current time: ${new Date().toLocaleString(language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : language === 'it' ? 'it-IT' : language === 'pt' ? 'pt-PT' : 'es-ES')}`;
      },
    },
    {
      command: 'gps',
      description: t.commands.gps,
      handler: () => {
        requestLocation();
        if (gps && gps.latitude && gps.longitude) {
          return `GPS Location: ${gps.latitude.toFixed(6)}, ${gps.longitude.toFixed(6)}`;
        }
        return '[INFO] Requesting GPS location...';
      },
    },
    {
      command: 'focus',
      description: t.commands.focus,
      handler: (args) => {
        const minutes = parseInt(args || '25');
        startFocus(minutes);
        return `[SUCCESS] Focus timer started: ${minutes} minutes`;
      },
    },
    {
      command: 'break',
      description: t.commands.break,
      handler: (args) => {
        const minutes = parseInt(args || '5');
        startBreak(minutes);
        return `[SUCCESS] Break timer started: ${minutes} minutes`;
      },
    },
    {
      command: 'stop',
      description: t.commands.stop,
      handler: () => {
        stop();
        return '[SUCCESS] Timer stopped';
      },
    },
    {
      command: 'projects',
      description: t.commands.projects,
      handler: async () => {
        try {
          const projects = await listProjects();
          const list = projects.map(p => `  - ${p.name} [${p.status}] ${p.progress_percent || 0}%`).join('\n');
          return `Projects:\n${list}`;
        } catch (e: any) {
          return `[ERROR] ${e.message}`;
        }
      },
    },
    {
      command: 'clear',
      description: 'Clear the console',
      handler: () => {
        setMessages([]);
        return '';
      },
    },
  ];

  const handleExecute = async (cmd: string, args?: string) => {
    const command = commands.find(c => c.command === cmd);
    if (command) {
      const result = await Promise.resolve(command.handler(args));
      if (result) {
        addMessage('system', result, ['Continue', 'Help', 'Clear']);
      }
    } else {
      addMessage('system', `[ERROR] Unknown command: ${cmd}`, ['Help', 'Clear']);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage('user', input);
      
      // Check if it's a command (starts with /)
      if (input.startsWith('/')) {
        const parts = input.slice(1).split(' ');
        const cmd = parts[0];
        const args = parts.slice(1).join(' ');
        handleExecute(cmd, args);
      } else {
        // Regular message - provide options
        addMessage('system', `[EQL] Processing query: "${input}"`, [
          'View Projects',
          'Set Timer',
          'Get Location',
          'Help'
        ]);
      }
      setInput('');
    }
  };

  const handleOptionClick = (option: string) => {
    const optionMap: Record<string, string> = {
      'View Projects': '/projects',
      'Set Timer': '/focus 25',
      'Get Location': '/gps',
      'Help': '/help',
      'Continue': '',
      'Clear': '/clear'
    };

    const command = optionMap[option];
    if (command) {
      setInput(command);
      setTimeout(() => {
        const form = document.querySelector('form');
        if (form) {
          form.requestSubmit();
        }
      }, 10);
    }
  };

  if (!hasCompletedFRE) {
    return (
      <Layout>
        <FRETerminal />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col h-full bg-black">
        <div className="flex-1 overflow-y-auto p-6 font-mono">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="text-[#00ff00] text-sm mb-8">
              <div className="border border-[#00ff00] p-4 mb-4">
                <pre className="text-xs">
{`╔═══════════════════════════════════════════════╗
║   EQUITYLABS QUERY LANGUAGE v1.0.0           ║
║   TERMINAL ACCESS GRANTED                     ║
╚═══════════════════════════════════════════════╝`}
                </pre>
              </div>
            </div>

            {messages.map((msg) => (
              <MessageDisplay
                key={msg.id}
                message={msg}
                onOptionClick={handleOptionClick}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-[#00ff00] bg-black p-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-[#00ff00] font-mono text-sm shrink-0">EQL&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border border-[#00ff00] px-3 py-2 text-[#00ff00] font-mono text-sm outline-none focus:shadow-[0_0_10px_rgba(0,255,0,0.5)] placeholder-[#00ff00]/30"
                placeholder="Enter query or /help for commands..."
                autoFocus
              />
              <Button
                type="submit"
                className="bg-[#00ff00] text-black hover:bg-[#00cc00] font-mono text-sm px-6"
              >
                EXECUTE
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const MessageDisplay = ({ 
  message, 
  onOptionClick 
}: { 
  message: ChatMessage; 
  onOptionClick: (option: string) => void;
}) => {
  const { displayedText, isTyping } = useTypingEffect(
    message.type === 'system' ? message.content : message.content,
    message.type === 'system' ? 30 : 0
  );

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <span className="text-[#00ff00] font-mono text-sm shrink-0">
          {message.type === 'user' ? '>' : '[SYS]'}
        </span>
        <div className="flex-1">
          <div className="text-[#00ff00] font-mono text-sm whitespace-pre-wrap">
            {message.type === 'system' ? displayedText : message.content}
            {isTyping && <span className="animate-pulse">▋</span>}
          </div>
          
          {message.options && !isTyping && (
            <div className="flex flex-wrap gap-2 mt-3">
              {message.options.map((option, idx) => (
                <Button
                  key={idx}
                  onClick={() => onOptionClick(option)}
                  variant="outline"
                  size="sm"
                  className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black font-mono text-xs"
                >
                  [ {option} ]
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Console;
