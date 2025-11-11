import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, ExternalLink } from 'lucide-react';

interface GmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GmailModal = ({ isOpen, onClose }: GmailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Gmail
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center p-8 gap-4">
          <Mail className="w-16 h-16 text-muted-foreground" />
          <p className="text-center text-muted-foreground">
            Gmail integration is coming soon. For now, you can access Gmail directly.
          </p>
          <Button
            onClick={() => window.open('https://mail.google.com', '_blank')}
            className="gap-2"
          >
            Open Gmail
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GmailModal;
