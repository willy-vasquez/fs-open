import axios from 'axios';

const baseUrl =
  'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather';
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const getWeather = async (country) => {
  const request = axios.get(
    `${baseUrl}?q=${country}&units=metric&appid=${apiKey}`
  );
  return request.then((response) => response.data);
};
