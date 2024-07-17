import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import services from './services/services'

function App() {
  const [countries, setCountries] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(()=>{
		services.getAll()
		.then(response=>{
			setCountries(response);
		})
	},[])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <div>
      <Form
        submitHandler={submitHandler}
      />
    </div>
  )
}

export default App
