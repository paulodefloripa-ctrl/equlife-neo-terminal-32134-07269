import { useState } from 'react';
import { GPSData } from '@/lib/types';

export const useGPS = () => {
  const [gps, setGPS] = useState<GPSData>({
    latitude: null,
    longitude: null,
    city: null,
    authorized: false,
  });

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGPS({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: 'Madrid',
            authorized: true,
          });
        },
        () => {
          setGPS({
            latitude: 40.4168,
            longitude: -3.7038,
            city: 'Madrid (mock)',
            authorized: false,
          });
        }
      );
    }
  };

  return { gps, requestLocation };
};
