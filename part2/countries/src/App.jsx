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

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchField = search.toLowerCase();
    const findSubstring = (country)=>country.name.common.toLowerCase().includes(searchField);
		setSearchResult(countries.filter(findSubstring));
  }

  const handleSearch = (event) =>{
    setSearch(event.target.value);
  }

  return (
    <div>
      <Form
        handleSubmit={handleSubmit}
        handleSearch={handleSearch}
      />
      
      <Results
        searchResult={searchResult}
      />
    </div>
  )
}

export default App
