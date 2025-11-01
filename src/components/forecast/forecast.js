import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data, temperatureUnit, onTemperatureUnitToggle }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
  
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
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">{item.weather[0].description}</label>
                  <label 
                    className="min-max"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemperatureUnitToggle();
                    }}
                    style={{ cursor: 'pointer' }}
                    title="Click to toggle between Celsius and Fahrenheit"
                  >
                    {convertTemperature(item.main.temp_max)}°{temperatureUnit} /{convertTemperature(item.main.temp_min)}°{temperatureUnit}
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure:</label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed:</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {item.wind.deg !== undefined && (
                      <span 
                        className="wind-arrow"
                        style={{
                          display: 'inline-block',
                          transform: `rotate(${getWindDirectionRotation(item.wind.deg)}deg)`,
                          fontSize: '14px',
                          transition: 'transform 0.3s ease'
                        }}
                        title={`Wind direction: ${getWindDirection(item.wind.deg)}`}
                      >
                        ↑
                      </span>
                    )}
                    <span>{item.wind.speed} m/s</span>
                    {item.wind.deg !== undefined && (
                      <span style={{ fontSize: '10px', opacity: 0.8 }}>
                        {getWindDirection(item.wind.deg)}
                      </span>
                    )}
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label 
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemperatureUnitToggle();
                    }}
                    style={{ cursor: 'pointer' }}
                    title="Click to toggle between Celsius and Fahrenheit"
                  >
                    {convertTemperature(item.main.feels_like)}°{temperatureUnit}
                  </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
