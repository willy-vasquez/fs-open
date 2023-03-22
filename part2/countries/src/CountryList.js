import React from 'react';
import { Country } from './Country';

export const CountryList = ({ countries, showCountry }) => {
  return (
    <div>
      {countries.length === 1 ? (
        <Country country={countries} />
      ) : (
        countries.map((country, index) => (
          <div key={index}>
            <>{country.name}</>{' '}
            <button onClick={() => showCountry(country)}>show</button>
          </div>
        ))
      )}
    </div>
  );
};
