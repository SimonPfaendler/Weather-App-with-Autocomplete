// src/api.js

export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const geoApiOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '5d9be88d35msh79867244ecf0cfdp10995bjsn1bb496b07efc',
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
  },
};

export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
export const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?';
export const WEATHER_API_KEY = 'ee745f328c350fffa70e434bf3b37ea8';
