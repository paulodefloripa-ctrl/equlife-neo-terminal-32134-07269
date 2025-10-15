import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { MapPin } from 'lucide-react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MapModal = ({ isOpen, onClose }: MapModalProps) => {
  const mockLocation = {
    lat: -34.6037,
    lng: -58.3816,
    name: 'Buenos Aires, Argentina'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="font-mono">
        <DialogHeader>
          <DialogTitle className="text-primary">🧭 GPS / Mapa</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-card border border-border rounded">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <div className="font-semibold text-primary">{mockLocation.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Lat: {mockLocation.lat}° / Lng: {mockLocation.lng}°
                </div>
              </div>
            </div>
          </div>

          <div className="aspect-video bg-muted rounded border border-border flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">
                Mapa interactivo (próximamente)
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Integración con servicios de mapeo en desarrollo
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
