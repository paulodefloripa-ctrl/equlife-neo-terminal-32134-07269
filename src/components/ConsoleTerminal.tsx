import { useState, useRef, useEffect } from 'react';
import { ConsoleCommand } from '@/lib/types';
import { useSettings } from '@/hooks/useSettings';

type Message = {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
};

type ConsoleTerminalProps = {
  commands: ConsoleCommand[];
  onExecute: (cmd: string, args?: string) => void;
};

const ConsoleTerminal = ({ commands, onExecute }: ConsoleTerminalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'system', content: 'EquityLabs Nano Console v1.0' },
    { id: '2', type: 'system', content: 'Type "help" for available commands' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { settings } = useSettings();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `> ${input}`,
    };

    setMessages(prev => [...prev, userMsg]);
    setHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    const [cmd, ...argsParts] = input.trim().split(' ');
    const args = argsParts.join(' ');
    
    onExecute(cmd, args);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const addMessage = (type: 'agent' | 'system', content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type,
      content,
    }]);
  };

  useEffect(() => {
    (window as any).__addConsoleMessage = addMessage;
  }, []);

  const backgroundStyle = settings.backgroundImageUrl
    ? {
        backgroundImage: `url(${settings.backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div 
      className="flex flex-col h-full relative"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col h-full">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-sm">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={
                msg.type === 'agent'
                  ? 'text-primary cyan-text-glow'
                  : msg.type === 'system'
                  ? 'text-muted-foreground'
                  : 'text-foreground'
              }
            >
              {msg.content}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-border">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-primary">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-foreground outline-none"
              placeholder="Type command..."
              autoFocus
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsoleTerminal;
