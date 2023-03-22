import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = async (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const updatePerson = async (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(() => {
    return { message: 'phonebook deleted' };
  });
};

export { getAll, createPerson, updatePerson, deletePerson };
