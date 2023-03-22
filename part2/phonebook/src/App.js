import { useState, useEffect } from 'react';
import { Filter } from './Filter';
import { PersonForm } from './PersonForm';
import { Persons } from './Persons';
import axios from 'axios';
import { createPerson, deletePerson, updatePerson } from './services/persons';

export const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setFilter] = useState('');
  const [filterPersons, setFilterPersons] = useState([...persons]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons([...response.data]);
      setFilterPersons([...response.data]);
    });
  }, []);

  const addNewPerson = (e) => {
    e.preventDefault();
    const { name: newName, number: newNumber } = newPerson;

    if (newName === '' || newNumber === '') {
      alert('missing fields');
      return;
    }

    const alreadyAdded = persons.find(({ name }) => name === newName);

    if (!alreadyAdded) {
      createPerson({ name: newName, number: newNumber }).then((response) => {
        setPersons([...persons, response]);
        setFilterPersons([...persons, response]);
        setNewPerson({ name: '', number: '' });
        setFilter('');
      });
    } else {
      if (alreadyAdded.number === newNumber)
        alert(`${newName} is already added to phonebook`);
      else {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          updatePerson(alreadyAdded.id, {
            ...alreadyAdded,
            number: newNumber,
          }).then((response) => {
            setFilterPersons(
              persons.map((person) =>
                person.id === alreadyAdded.id ? response : person
              )
            );
            setPersons(
              persons.map((person) =>
                person.id === alreadyAdded.id ? response : person
              )
            );
          });
        }
      }
    }
  };

  const onChangeFilter = (event) => {
    const textFilter = event.target.value;
    setFilter(textFilter);
    if (textFilter !== '') {
      setFilterPersons(
        persons.filter(({ name }) =>
          name.toLowerCase().includes(textFilter.toLowerCase())
        )
      );
    } else {
      setFilterPersons([...persons]);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id).then((response) => {
        if (response.message === 'phonebook deleted') {
          setPersons(persons.filter((person) => person.id !== id));
          setFilterPersons(persons.filter((person) => person.id !== id));
          setNewPerson({ name: '', number: '' });
          setFilter('');
        }
      });
    }
  };

  return (
    <div>
      <h2>1+1</h2>
      <Filter filter={filter} onChangeFilter={onChangeFilter} />
      <PersonForm
        addNewPerson={addNewPerson}
        newPerson={newPerson}
        setNewPerson={setNewPerson}
      />
      <Persons filterPersons={filterPersons} handleDelete={handleDelete} />
    </div>
  );
};
