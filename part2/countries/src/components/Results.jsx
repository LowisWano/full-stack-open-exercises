import CountryPage from './CountryPage'

const Results = ({ searchResult, showPage }) => {

  if(!searchResult){
    return null;
  }

  if(searchResult.length > 10){
    return <p>Too many matches, specify another filter</p>
  }

  if(searchResult.length === 1){
    return <CountryPage countryData={searchResult[0]}/>
  }

  return(
    <div>
      {
        searchResult.map((country) => {
          return <p key={country.name.common}>{country.name.common} <button onClick={showPage(country)}>show</button></p>
        })
      }
    </div>
  )
}

export default Results;

