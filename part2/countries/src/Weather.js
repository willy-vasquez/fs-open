import React from 'react';

export const Weather = ({ weather }) => {
  const { name, temperature, wind, icon } = weather;
  return (
    <>
      <h3>Weather in {name}</h3>
      <p>temperature {temperature} Celcius</p>
      {icon && (
        <img
          alt="temperature icon"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        />
      )}
      <p>wind {wind} m/s</p>
    </>
  );
};
