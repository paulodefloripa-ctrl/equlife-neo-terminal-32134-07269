import { useState, useRef, ChangeEvent } from 'react';
import { Send, Mic, MicOff, Upload, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { useVoice } from '@/hooks/useVoice';
import { useToast } from './ui/use-toast';

interface EnhancedInputProps {
  onSubmit: (text: string, file?: File) => void;
  placeholder?: string;
}

const EnhancedInput = ({ onSubmit, placeholder = '¿Cómo puedo ayudarte hoy?' }: EnhancedInputProps) => {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const { 
    speak, 
    stopSpeaking, 
    isSpeaking, 
    startListening, 
    stopListening, 
    isListening, 
    transcript,
    clearTranscript,
    hasVoiceSupport,
    hasRecognitionSupport
  } = useVoice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || selectedFile) {
      onSubmit(input.trim(), selectedFile || undefined);
      setInput('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleMicToggle = () => {
    if (!hasRecognitionSupport) {
      toast({
        title: 'No disponible',
        description: 'El reconocimiento de voz no está disponible en tu navegador.',
        variant: 'destructive',
      });
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleVoiceToggle = () => {
    if (!hasVoiceSupport) {
      toast({
        title: 'No disponible',
        description: 'La síntesis de voz no está disponible en tu navegador.',
        variant: 'destructive',
      });
      return;
    }

    if (isSpeaking) {
      stopSpeaking();
    } else if (input) {
      speak(input);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: 'Archivo seleccionado',
        description: file.name,
      });
    }
  };

  // Update input with transcript
  if (transcript && !input) {
    setInput(transcript);
    clearTranscript();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-32 bg-card border border-border rounded-lg text-foreground outline-none focus:border-primary font-mono"
        />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleVoiceToggle}
            className="h-7 px-2"
            disabled={!hasVoiceSupport}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleMicToggle}
            className={`h-7 px-2 ${isListening ? 'text-red-500' : ''}`}
            disabled={!hasRecognitionSupport}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="h-7 px-2"
          >
            <Upload className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept="*/*"
      />

      <Button type="submit" size="sm" className="font-mono">
        <Send className="w-4 h-4" />
      </Button>

      {selectedFile && (
        <span className="text-xs text-muted-foreground font-mono">
          {selectedFile.name}
        </span>
      )}
    </form>
  );
};

export default EnhancedInput;
