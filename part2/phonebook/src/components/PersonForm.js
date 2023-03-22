import React from 'react';

export const PersonForm = ({ addNewPerson, newPerson, setNewPerson }) => {
  return (
    <form onSubmit={addNewPerson}>
      <h2>add a new</h2>
      <div>
        name:{' '}
        <input
          value={newPerson.name}
          onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
        />
      </div>
      <div>
        number:{' '}
        <input
          value={newPerson.number}
          onChange={(e) =>
            setNewPerson({ ...newPerson, number: e.target.value })
          }
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
