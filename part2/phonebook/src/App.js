import { useState, useEffect } from 'react';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import {
  createPerson,
  deletePerson,
  getAll,
  updatePerson,
} from './services/persons';
import { Notification } from './components/Notification';

export const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ message: null });

  useEffect(() => {
    getAll().then((response) => {
      setPersons([...response]);
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
      handleNotification(`${newName} was created`, 'success');
      createPerson({ name: newName, number: newNumber }).then((response) => {
        setPersons([...persons, response]);
        clearForm();
      });
    } else {
      update(alreadyAdded, newName, newNumber);
    }
  };

  const update = (alreadyAdded, newName, newNumber) => {
    if (alreadyAdded.number === newNumber)
      alert(`${newName} is already added to phonebook`);
    else {
      const ok = window.confirm(
        `${newName} is already added to phonebook, replace the number?`
      );
      if (ok) {
        updatePerson(alreadyAdded.id, {
          ...alreadyAdded,
          number: newNumber,
        })
          .then((response) => {
            handleNotification(`${newName} was updated`, 'success');
            setPersons(
              persons.map((person) =>
                person.id === alreadyAdded.id ? response : person
              )
            );
          })
          .catch((e) => {
            console.log(e);
            handleNotification(`${newName} has already removed`, 'error');
            setPersons(persons.filter((p) => p.id !== alreadyAdded.id));
          });
        clearForm();
      }
    }
  };

  const onChangeFilter = (event) => {
    const textFilter = event.target.value;
    setFilter(textFilter);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id).then((response) => {
        if (response.message === 'phonebook deleted') {
          handleNotification(`${name} was deleted`, 'error');
          setPersons(persons.filter((person) => person.id !== id));
          clearForm();
        }
      });
    }
  };

  const clearForm = () => {
    setNewPerson({ name: '', number: '' });
    setFilter('');
  };

  const handleNotification = (message, type = 'info') => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification({ message: undefined, type: 'info' });
    }, 3000);
  };

  const byFilterName = ({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase());

  const filterPersons = filter ? persons.filter(byFilterName) : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} onChangeFilter={onChangeFilter} />
      <Notification info={notification} />
      <PersonForm
        addNewPerson={addNewPerson}
        newPerson={newPerson}
        setNewPerson={setNewPerson}
      />
      <Persons filterPersons={filterPersons} handleDelete={handleDelete} />
    </div>
  );
};
