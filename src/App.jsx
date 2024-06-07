import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from './api/weather';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const data = await fetchWeatherData();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    getWeatherData();
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      { weatherData ? (
        <pre>{ JSON.stringify(weatherData, null, 2) }</pre>
      ) : (
        <p>Loading...</p>
      ) }
    </div>
  );
};

export default App;
