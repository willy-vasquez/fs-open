import React from 'react';

export const Persons = ({ filterPersons, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {filterPersons.map(({ id, name, number }, index) => (
          <li key={index}>
            {name} {number}{' '}
            <button onClick={() => handleDelete(id, name)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};
