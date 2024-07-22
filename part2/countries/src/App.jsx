import { useState, useEffect } from 'react'
import Form from './components/Form'
import Results from './components/Results'
import services from './services/services'

function App() {
  const [countries, setCountries] = useState(0);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState('');

  useEffect(()=>{
		services.getAll()
		.then(response=>{
			setCountries(response);
		})
	},[])

  const findSubstring = (searchField)=> {
    return (country)=>country.name.common.toLowerCase().includes(searchField.toLowerCase())
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
		setSearchResult(countries.filter(findSubstring(search)));
  }

  const handleSearch = (event) =>{
    setSearch(event.target.value);
  }

  const showPage = (countryInfo)=>{
    const countryArr = [countryInfo]
    return ()=>setSearchResult(countryArr);
  }
  
  return (
    <div>
      <Form
        handleSubmit={handleSubmit}
        handleSearch={handleSearch}
      />
      
      <Results
        searchResult={searchResult}
        showPage={showPage}
      />
    </div>
  )
}

export default App
