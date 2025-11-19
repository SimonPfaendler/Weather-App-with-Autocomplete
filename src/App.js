import './App.css';
import Search from './components/search/search';
import Forecast from './components/forecast/forecast';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY, FORECAST_API_URL } from './api';
import { useState } from 'react';
import Toggle from './components/toggle/toggle';
import FavoritesList from './components/favorites/favorites-list';
import { useEffect } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [theme, setTheme] = useState("light");
  const [temperatureUnit, setTemperatureUnit] = useState("C"); // "C" for Celsius, "F" for Fahrenheit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('weather-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weather-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = () => {
    if (currentWeather && !favorites.some(city => city.label === currentWeather.city)) {
      const newFavorite = {
        value: `${currentWeather.coord.lat} ${currentWeather.coord.lon}`,
        label: currentWeather.city
      };
      setFavorites([...favorites, newFavorite]);
    }
  };

  const removeFromFavorites = (cityToRemove) => {
    setFavorites(favorites.filter(city => city.label !== cityToRemove.label));
  };

  const isFavorite = (cityName) => {
    return favorites.some(city => city.label === cityName);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleSearchChange({ value: `${latitude} ${longitude}`, label: "Current Location" });
        },
        (err) => {
          setLoading(false);
          setError("Location access denied. Please search manually.");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    setLoading(true);
    setError(null);

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${FORECAST_API_URL}&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        if (weatherResponse.cod !== 200) {
          throw new Error(weatherResponse.message);
        }

        setCurrentWeather({ city: searchData.label === "Current Location" ? weatherResponse.name : searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label === "Current Location" ? weatherResponse.name : searchData.label, ...forecastResponse });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch weather data. Please try again.");
        setLoading(false);
      });
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

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px" }}>
        <button
          onClick={handleLocationClick}
          style={{
            padding: "8px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4a90e2",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
        </button>
        <Toggle theme={theme} onThemeChange={toggleTheme} />
      </div>

      <Search onSearchChange={handleSearchChange} theme={theme} />

      {error && <div style={{ color: 'red', textAlign: 'center', margin: '10px' }}>{error}</div>}
      {loading && <div style={{ color: theme === 'dark' ? '#fff' : '#333', textAlign: 'center', margin: '20px' }}>Loading...</div>}

      {!currentWeather && !loading && (
        <FavoritesList
          favorites={favorites}
          onSelectFavorite={handleSearchChange}
          onRemoveFavorite={removeFromFavorites}
        />
      )}

      {currentWeather && (
        <CurrentWeather
          data={currentWeather}
          temperatureUnit={temperatureUnit}
          onTemperatureUnitToggle={toggleTemperatureUnit}
          isFavorite={isFavorite(currentWeather.city)}
          onToggleFavorite={addToFavorites}
        />
      )}
      {forecast && <Forecast data={forecast} temperatureUnit={temperatureUnit} onTemperatureUnitToggle={toggleTemperatureUnit} />}
    </div>
  );
}

export default App;