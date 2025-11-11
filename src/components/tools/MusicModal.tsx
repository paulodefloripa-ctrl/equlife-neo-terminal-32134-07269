import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Music, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MusicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MusicModal = ({ isOpen, onClose }: MusicModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Music Player
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="spotify" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="spotify">Spotify</TabsTrigger>
            <TabsTrigger value="youtube">YouTube Music</TabsTrigger>
          </TabsList>
          
          <TabsContent value="spotify" className="space-y-4">
            <div className="flex flex-col items-center justify-center p-8 gap-4">
              <Music className="w-16 h-16 text-green-500" />
              <p className="text-center text-muted-foreground">
                Spotify player integration coming soon
              </p>
              <Button
                onClick={() => window.open('https://open.spotify.com', '_blank')}
                className="gap-2 bg-green-500 hover:bg-green-600"
              >
                Open Spotify
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="youtube" className="space-y-4">
            <div className="flex flex-col items-center justify-center p-8 gap-4">
              <Music className="w-16 h-16 text-red-500" />
              <p className="text-center text-muted-foreground">
                YouTube Music player integration coming soon
              </p>
              <Button
                onClick={() => window.open('https://music.youtube.com', '_blank')}
                className="gap-2 bg-red-500 hover:bg-red-600"
              >
                Open YouTube Music
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MusicModal;
