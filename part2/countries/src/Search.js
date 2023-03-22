import React from 'react';

export const Search = ({ text, handleChangeCountry }) => {
  return (
    <div>
      <p>Find countries</p>
      <input value={text} onChange={handleChangeCountry} />
    </div>
  );
};
