import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from './ui/command';
import { Command as CommandType } from '@/lib/types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: CommandType[];
  onExecute: (command: string) => void;
}

const CommandPalette = ({ isOpen, onClose, commands, onExecute }: CommandPaletteProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSelect = (command: string) => {
    onExecute(command);
    onClose();
    setSearch('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <Command className="rounded-lg border border-primary shadow-lg glass-effect neon-border">
              <CommandInput 
                placeholder="Escribí un comando..." 
                value={search}
                onValueChange={setSearch}
                className="font-mono"
              />
              <CommandList>
                <CommandEmpty>No se encontraron comandos.</CommandEmpty>
                <CommandGroup heading="Comandos disponibles" className="font-mono">
                  {commands.map((cmd) => (
                    <CommandItem
                      key={cmd.command}
                      onSelect={() => handleSelect(cmd.command)}
                      className="font-mono cursor-pointer"
                    >
                      <span className="text-primary">{cmd.command}</span>
                      <span className="ml-2 text-muted-foreground text-xs">
                        {cmd.description}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
