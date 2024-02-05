import React from 'react';

const WeatherEntry = ({ entry }) => {
  return (
    <div>
      <h3>Weather in {entry.name}</h3>
      <p>Temperature: {(entry.main.temp - 273.15).toFixed(2)}°C</p>
      <p>Weather: {entry.weather[0].description}</p>
    </div>
  );
};

export default WeatherEntry;
