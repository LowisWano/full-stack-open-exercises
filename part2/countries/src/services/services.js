import axios from 'axios';
const api_key = import.meta.env.VITE_SOME_KEY;
const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const baseWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getAll = () => {
    const request = axios.get(countriesUrl);
    return request.then(response => response.data);
}
  
const getWeatherInfo = async (capital) => {
  const request = axios.get(`${baseWeatherUrl}?q=${capital}&appid=${api_key}&units=metric`)
  return request.then(response=>response.data)
};

const exports = {getAll, getWeatherInfo};
export default exports;