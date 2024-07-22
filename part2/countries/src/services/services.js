import axios from 'axios';
const api_key = import.meta.env.VITE_SOME_KEY;
const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const baseWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherUrl = (lat, lon, api_param)=>{
  return `${baseWeatherUrl}?lat=${lat}&lon=${lon}&appid=${api_param}&units=metric`;
}

const getAll = () => {
    const request = axios.get(countriesUrl);
    return request.then(response => response.data);
}
  
const getWeatherInfo = (lat, lon)=>{
  const request = axios.get(getWeatherUrl(lat, lon, api_key));
  return request.then(response=>response.data);
}


const exports = {getAll, getWeatherInfo};
export default exports;