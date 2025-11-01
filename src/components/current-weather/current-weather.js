import "./current-weather.css";

const CurrentWeather = ({ data, temperatureUnit, onTemperatureUnitToggle }) => {
    const convertTemperature = (celsius) => {
        if (temperatureUnit === "F") {
            return Math.round(celsius * 9/5 + 32);
        }
        return Math.round(celsius);
    };

    const getWindDirection = (degrees) => {
        if (!degrees && degrees !== 0) return "N/A";
        const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    };

    const getWindDirectionRotation = (degrees) => {
        if (!degrees && degrees !== 0) return 0;
        // Wind direction degrees: 0° = North, 90° = East
        // Arrow rotation: 0° = pointing up (North)
        // We need to add 180° because the arrow points in the direction the wind is coming FROM
        return (degrees + 180) % 360;
    };

    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{data.city}</p>
                    <p className="weather-description">{data.weather[0].description}</p>
                </div>
                <img  alt="weather" className = "weather-icon" src={`icons/${data.weather[0].icon}.png`} />
            </div>
            <div className="bottom">
                <p 
                    className="temperature" 
                    onClick={onTemperatureUnitToggle}
                    style={{ cursor: 'pointer' }}
                    title="Click to toggle between Celsius and Fahrenheit"
                >
                    {convertTemperature(data.main.temp)}°{temperatureUnit}
                </p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels like</span>
                        <span className="parameter-value" 
                              onClick={onTemperatureUnitToggle}
                              style={{ cursor: 'pointer' }}
                              title="Click to toggle between Celsius and Fahrenheit">
                            {convertTemperature(data.main.feels_like)}°{temperatureUnit}
                        </span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {data.wind.deg !== undefined && (
                                <span 
                                    className="wind-arrow"
                                    style={{
                                        display: 'inline-block',
                                        transform: `rotate(${getWindDirectionRotation(data.wind.deg)}deg)`,
                                        fontSize: '16px',
                                        transition: 'transform 0.3s ease'
                                    }}
                                    title={`Wind direction: ${getWindDirection(data.wind.deg)}`}
                                >
                                    ↑
                                </span>
                            )}
                            <span>{data.wind.speed} m/s</span>
                            {data.wind.deg !== undefined && (
                                <span style={{ fontSize: '10px', opacity: 0.8 }}>
                                    {getWindDirection(data.wind.deg)}
                                </span>
                            )}
                        </span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-value">{data.main.pressure} hPa</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">{data.main.humidity}%</span>
                    </div>
                </div>
            </div>
        </div>
            
    );
}

export default CurrentWeather;