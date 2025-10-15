import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Upload } from 'lucide-react';
import { useState } from 'react';

interface OCRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OCRModal = ({ isOpen, onClose }: OCRModalProps) => {
  const [result, setResult] = useState('');

  const handleFileUpload = () => {
    // Mock OCR result
    setResult('Texto simulado extraído del documento:\n\nEste es un ejemplo de texto que sería extraído por OCR de un documento real. La integración completa se conectará a un servicio de OCR real.');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="font-mono">
        <DialogHeader>
          <DialogTitle className="text-primary">📄 OCR / Documentos</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Button
            onClick={handleFileUpload}
            className="w-full gap-2"
            variant="outline"
          >
            <Upload className="w-4 h-4" />
            Subir documento (simulado)
          </Button>

          {result && (
            <div className="p-4 bg-card border border-border rounded">
              <div className="text-sm whitespace-pre-wrap">{result}</div>
            </div>
          )}

          {!result && (
            <div className="text-center text-sm text-muted-foreground py-8">
              Subí un archivo para extraer texto automáticamente
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OCRModal;
