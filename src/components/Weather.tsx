import { useState, useEffect } from 'react';
import { MapPin, Thermometer, Wind, Droplets, Clock, CloudRain, Sun, Cloud, CloudLightning, Snowflake, ChevronDown, ChevronUp } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  location: string;
  windSpeed: number;
  feelsLike: number;
  time: string;
}

const getWeatherIcon = (condition: string) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes('rain')) return <CloudRain className="h-12 w-12 text-blue-500" />;
  if (lowerCondition.includes('cloud')) return <Cloud className="h-12 w-12 text-gray-500" />;
  if (lowerCondition.includes('thunder')) return <CloudLightning className="h-12 w-12 text-yellow-500" />;
  if (lowerCondition.includes('snow')) return <Snowflake className="h-12 w-12 text-blue-300" />;
  return <Sun className="h-12 w-12 text-yellow-500" />;
};

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        setLoading(true);
        setError(null);

        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });

        const { latitude, longitude } = position.coords;
        const apiKey = 'ce37322adad56a2f2cc59a1fce9bb7e8';
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        setWeather({
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          condition: data.weather[0].main,
          location: data.name,
          windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
          feelsLike: Math.round(data.main.feels_like),
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        });
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg animate-pulse">
        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
      </div>
    );
  }

  return weather ? (
    <div className="relative">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`transition-all duration-300 ${
          isExpanded 
            ? "bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg w-80" 
            : "bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-md cursor-pointer"
        }`}
      >
        {isExpanded ? (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-gray-500" />
                <h2 className="text-xl font-semibold text-gray-900">{weather.location}</h2>
              </div>
              <ChevronUp className="h-5 w-5 text-gray-500 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {getWeatherIcon(weather.condition)}
                <div className="ml-4">
                  <div className="text-3xl font-bold text-gray-900">{weather.temperature}°C</div>
                  <div className="text-sm text-gray-500">{weather.condition}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-red-500" />
                <div>
                  <div className="text-sm text-gray-500">Feels like</div>
                  <div className="font-medium">{weather.feelsLike}°C</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm text-gray-500">Wind</div>
                  <div className="font-medium">{weather.windSpeed} km/h</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-sm text-gray-500">Humidity</div>
                  <div className="font-medium">{weather.humidity}%</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Local time</div>
                  <div className="font-medium">{weather.time}</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            {getWeatherIcon(weather.condition)}
            <span className="text-xl font-bold text-gray-900">{weather.temperature}°C</span>
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </div>
        )}
      </div>
    </div>
  ) : null;
}