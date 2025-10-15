import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{ title: string; snippet: string }>>([]);

  const handleSearch = () => {
    // Mock search results
    setResults([
      {
        title: 'EQuityLife - Comunicación del Futuro',
        snippet: 'Plataforma avanzada de comunicación con IA integrada para gestión de proyectos y asistencia personal.'
      },
      {
        title: 'Neo AI Assistant - Documentación',
        snippet: 'Neo es un asistente operativo completo que actúa como coach, vendedor de servicios y gestor de proyectos.'
      },
      {
        title: 'Proyectos EQL - Roadmap 2030',
        snippet: 'Visualización estratégica de todos los proyectos en curso y planificados para la próxima década.'
      }
    ]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="font-mono max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-primary">🌐 Buscador IA</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué querés buscar?"
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} className="gap-2">
              <Search className="w-4 h-4" />
              Buscar
            </Button>
          </div>

          {results.length > 0 && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-4 bg-card border border-border rounded hover:border-primary transition-colors"
                >
                  <div className="font-semibold text-primary mb-2">{result.title}</div>
                  <div className="text-sm text-muted-foreground">{result.snippet}</div>
                </div>
              ))}
            </div>
          )}

          {results.length === 0 && query && (
            <div className="text-center text-sm text-muted-foreground py-8">
              Presioná Enter o clickeá Buscar para ver resultados
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
