import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(false);
  const API_KEY = 'ac3f434ea7cef3524d6470861ebb9722';

  useEffect(() => {
    if (selectedCity) {
      fetchWeather();
    }
  }, [selectedCity]);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (response.data.cod === '404') {
        setError('City not found'); // Set error message if city not found
        setWeatherData(null); // Reset weather data
      } else {
        setWeatherData(response.data);
        setError(null); // Reset error if successful
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Could not fetch weather data. Please try again.'); // Set error message
      setWeatherData(null); // Reset weather data
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setError(null); // Clear error message when typing a new city
    setSelectedCity(false); // Reset selectedCity to allow fetching data for the new city
  };

  const handleButtonClick = () => {
    if (city !== '') {
      setSelectedCity(true);
    } else {
      setError('Please enter a city.'); // Set error message if city is empty
      setWeatherData(null); // Reset weather data
    }
  };

  const getWeatherIcon = (weatherDescription) => {
    // Map weather description to corresponding icon
    switch (weatherDescription) {
      case 'clear sky':
        return '☀️';
      case 'few clouds':
        return '⛅';
      case 'scattered clouds':
      case 'broken clouds':
        return '🌥️';
      case 'shower rain':
      case 'rain':
        return '🌧️';
      case 'thunderstorm':
        return '⛈️';
      case 'snow':
        return '❄️';
      case 'mist':
        return '🌫️';
      default:
        return '🌍';
    }
  };

  return (
    <div className='container bg-primary py-4' style={{background:'linear-gradient(#007bff, #ffffff,#007bff)',textAlign:"center", border:"1px solid black",borderRadius:"25px"}}>
      <h2 style={{color:'black'}}>Weather Information</h2>
      <input type="text" value={city} onChange={handleCityChange} className='form-control mb-2' placeholder="Enter a city" />
      <button onClick={handleButtonClick} className='btn btn-primary' style={{margin:"10px"}}>Get Weather</button>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h3>Weather in {weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description} {getWeatherIcon(weatherData.weather[0].description)}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
