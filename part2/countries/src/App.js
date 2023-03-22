import React, { useState } from 'react';
import { CountryList } from './CountryList';
import { Search } from './Search';
import { getCountries } from './services/countries';

export const App = () => {
  const [countries, setCountries] = useState([]);

  const [textCountry, setTextCountry] = useState('');

  const handleChangeCountry = (event) => {
    const text = event.target.value;
    setTextCountry(text);
    if (text === '') {
      setCountries([]);
      return;
    }
    getCountries(text).then((response) => {
      const aux = [];
      for (const item of response) {
        let languages = [];
        try {
          languages = Object.values(item.languages);
        } catch (e) {
          languages = [];
        }
        aux.push({
          name: item.name.common,
          capital: item.capital?.[0],
          area: item.area,
          languages,
          flags: item.flags,
        });
      }
      setCountries(aux);
    });
  };

  const showCountry = (country) => {
    setCountries([{ ...country }]);
    setTextCountry('');
  };

  return (
    <div>
      <Search text={textCountry} handleChangeCountry={handleChangeCountry} />
      {countries.length > 4 ? (
        <p>Too many matches, especify another filter</p>
      ) : (
        <CountryList countries={countries} showCountry={showCountry} />
      )}
    </div>
  );
};
