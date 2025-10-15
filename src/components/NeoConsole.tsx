import { useState, useRef, useEffect } from 'react';
import { Send, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ConversationMessage, QuickAction } from '@/lib/types';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { useVoice } from '@/hooks/useVoice';
import { motion, AnimatePresence } from 'framer-motion';

interface NeoConsoleProps {
  messages: ConversationMessage[];
  onSendMessage: (message: string) => void;
  onQuickAction: (action: QuickAction) => void;
  voiceEnabled: boolean;
}

const MessageLine = ({ message, voiceEnabled, onSpeak }: { 
  message: ConversationMessage; 
  voiceEnabled: boolean;
  onSpeak: (text: string) => void;
}) => {
  const { displayedText, isTyping } = useTypingEffect(
    message.type === 'neo' ? message.content : '',
    20
  );

  const content = message.type === 'neo' ? displayedText : message.content;
  const prefix = message.type === 'user' ? '> ' : message.type === 'neo' ? 'Neo: ' : '>> ';

  return (
    <div className="mb-2 group">
      <div className="flex items-start gap-2">
        <span className={`font-mono text-sm ${
          message.type === 'user' ? 'text-secondary' : 
          message.type === 'neo' ? 'text-primary' : 
          'text-muted-foreground'
        }`}>
          {prefix}{content}
          {message.type === 'neo' && isTyping && <span className="cursor-blink">▊</span>}
        </span>
        
        {message.type === 'neo' && voiceEnabled && !isTyping && (
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 px-2"
            onClick={() => onSpeak(message.content)}
          >
            <Volume2 className="w-3 h-3" />
          </Button>
        )}
      </div>

      {message.quickActions && message.quickActions.length > 0 && !isTyping && (
        <div className="flex flex-wrap gap-2 mt-2 ml-6">
          {message.quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              className="text-xs font-mono"
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

const NeoConsole = ({ messages, onSendMessage, onQuickAction, voiceEnabled }: NeoConsoleProps) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { speak, stopSpeaking, isSpeaking, startListening, stopListening, isListening, transcript, clearTranscript } = useVoice();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
      clearTranscript();
    }
  }, [transcript, clearTranscript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleVoiceToggle = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-1 font-mono text-sm">
        {messages.map((msg) => (
          <MessageLine 
            key={msg.id} 
            message={msg} 
            voiceEnabled={voiceEnabled}
            onSpeak={speak}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribí tu mensaje o presioná / para comandos..."
              className="font-mono pr-24 bg-card border-border"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              {voiceEnabled && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceToggle}
                  className="h-7 px-2"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              )}
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleMicToggle}
                className={`h-7 px-2 ${isListening ? 'text-destructive' : ''}`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <Button type="submit" size="sm" className="font-mono">
            <Send className="w-4 h-4" />
          </Button>
        </form>

        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs text-destructive font-mono flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            Escuchando...
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NeoConsole;
