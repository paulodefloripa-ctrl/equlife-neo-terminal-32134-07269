import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Plus } from 'lucide-react';
import { useState } from 'react';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PDFModal = ({ isOpen, onClose }: PDFModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            PDF Editor
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center p-8 gap-4">
          <FileText className="w-16 h-16 text-muted-foreground" />
          
          {!selectedFile ? (
            <>
              <p className="text-center text-muted-foreground mb-4">
                Create a new PDF or open an existing one
              </p>
              
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  New PDF
                </Button>
                
                <Button asChild className="gap-2">
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Open PDF
                    <input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Selected file:</p>
              <p className="font-medium">{selectedFile.name}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSelectedFile(null)}
              >
                Choose another file
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFModal;
