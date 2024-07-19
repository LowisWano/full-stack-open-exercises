import { useState, useEffect } from 'react'
import Form from './components/Form'
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
    event.preventDefault()
  }

  const handleSearch = (event) =>{
    setSearch(event.target.value);
  }

  return (
    <div>
      <Form
        submitHandler={handleSubmit}
        handleSearch={handleSearch}
      />
      
    </div>
  )
}

export default App
