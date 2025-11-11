import { useState, useEffect } from 'react';

export interface WeatherData {
  temperature: number | null;
  condition: string;
  icon: string;
  city: string;
  loading: boolean;
  error: string | null;
}

const getWeatherIcon = (condition: string) => {
  const icons: Record<string, string> = {
    'Clear': '☀️',
    'Clouds': '⛅',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️'
  };
  return icons[condition] || '🌡️';
};

export const useWeather = (latitude: number | null, longitude: number | null) => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: null,
    condition: '',
    icon: '🌡️',
    city: '',
    loading: false,
    error: null
  });

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchWeather = async () => {
      setWeather(prev => ({ ...prev, loading: true, error: null }));

      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        
        if (!apiKey) {
          // Fallback: use a free service without API key
          const response = await fetch(
            `https://wttr.in/${latitude},${longitude}?format=j1`
          );
          const data = await response.json();
          
          setWeather({
            temperature: Math.round(parseFloat(data.current_condition[0].temp_C)),
            condition: data.current_condition[0].weatherDesc[0].value,
            icon: '🌡️',
            city: data.nearest_area[0].areaName[0].value,
            loading: false,
            error: null
          });
          return;
        }

        // Use OpenWeatherMap API if key is available
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`
        );
        
        if (!response.ok) throw new Error('Weather fetch failed');
        
        const data = await response.json();

        setWeather({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          icon: getWeatherIcon(data.weather[0].main),
          city: data.name,
          loading: false,
          error: null
        });
      } catch (error) {
        setWeather(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch weather'
        }));
      }
    };

    fetchWeather();
    
    // Refresh every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [latitude, longitude]);

  return weather;
};
