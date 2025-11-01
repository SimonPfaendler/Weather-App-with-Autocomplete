import './App.css';
import Search from './components/search/search';
import Forecast from './components/forecast/forecast';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY, FORECAST_API_URL } from './api';
import { useState } from 'react';
import Toggle from './components/toggle/toggle';
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [theme, setTheme] = useState("light");
  const [temperatureUnit, setTemperatureUnit] = useState("C"); // "C" for Celsius, "F" for Fahrenheit
  
  const handleSearchChange = (searchData) => {
    const[lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${FORECAST_API_URL}&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.style.backgroundColor = newTheme === "dark" ? "#0b1220" : "#f6f7fb";
    document.body.style.color = newTheme === "dark" ? "#e6eef8" : "#0f172a";
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prevUnit => prevUnit === "C" ? "F" : "C");
  };

  console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="container">

      <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}>
        <Toggle theme={theme} onThemeChange={toggleTheme} />
      </div>

      <Search onSearchChange={handleSearchChange} theme={theme} />
      {currentWeather && <CurrentWeather data={currentWeather} temperatureUnit={temperatureUnit} onTemperatureUnitToggle={toggleTemperatureUnit} />}
      {forecast && <Forecast data={forecast} temperatureUnit={temperatureUnit} onTemperatureUnitToggle={toggleTemperatureUnit} />}
    </div>
  );
}

export default App;