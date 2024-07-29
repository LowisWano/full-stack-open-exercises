/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import services from '../services/services'

const CountryPage = ({ countryData }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(()=>{
    services.getWeatherInfo(countryData.capital[0])
    .then((response)=>{
      setWeatherData(response)
    })
  },[])

  if(!weatherData){
    return <p>Loading weather data...</p>
  }

  console.log(weatherData);
  return(
    <div>
      <h1>{countryData.name.common}</h1>
      <p>capital {countryData.capital[0]}</p>
      <p>area {countryData.area}</p>
      <h3>languages:</h3>
      <ul>
        {
          Object.entries(countryData.languages).map(lang => {
            return <li key={lang[0]}>{lang[1]}</li>
          })
        }
      </ul>
      <img src={countryData.flags.png} alt={countryData.flags.alt}/>
      <h2>Weather in {countryData.capital[0]}</h2>
      <p>temperature {weatherData.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  )
}

export default CountryPage
