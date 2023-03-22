import axios from 'axios';

const baseUrl = 'https://restcountries.com/v3.1';

export const getCountries = async (text) => {
  const request = axios.get(`${baseUrl}/name/${text}`);
  return request.then((response) => response.data);
};
