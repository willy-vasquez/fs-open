import React, { useState, useEffect } from 'react';
import { getWeather } from './services/weather';
import { Weather } from './Weather';

export const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  const {
    name,
    languages,
    area,
    capital,
    flags: { alt, png },
  } = country[0];

  useEffect(() => {
    getWeather(capital).then((response) => {
      setWeather({
        name: response.name,
        wind: response.wind.speed,
        temperature: response.main.temp,
        icon: response?.weather?.[0].icon,
      });
    });
  }, [capital]);

  return (
    <div>
      <h2>{name}</h2>
      <img style={{ width: '80px', height: '80px' }} alt={alt} src={`${png}`} />
      <p>capital {capital}</p>
      <p>area {area}</p>
      <p style={{ fontWeight: 800 }}>languages:</p>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <Weather weather={weather} />
    </div>
  );
};
