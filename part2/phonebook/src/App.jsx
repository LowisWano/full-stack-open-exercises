import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearchField] = useState('');
	const [searchResults, setSearchResult] = useState(persons)

	const handleSubmit = (event)=>{
		event.preventDefault();
		const findMatch = (person) => person.name === newName; 

		if(persons.some(findMatch)){
			alert(`${newName} is already added to the phonebook`)
		}else{
			const newPerson = {
				name: newName,
				number: newNumber
			}
			const updatedPersons = persons.concat(newPerson)
			setPersons(updatedPersons);
			setSearchResult(updatedPersons);
			setNewName('');
			setNewNumber('');
		}
	}

	const handleSearchSubmit = (event)=>{
		event.preventDefault();
		const searchField = search.toLowerCase();
		const findSubstring = (person)=>person.name.toLowerCase().includes(searchField);
		setSearchResult(persons.filter(findSubstring));
  }

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	}

	const handleNumberChange = (event)=>{
		setNewNumber(event.target.value);
	}

	const handleSearch = (event)=>{
		setSearchField(event.target.value);
	}

  return (
    <div>
      <h2>Phonebook</h2>
		<Filter 
	  		handleSearchSubmit={handleSearchSubmit}
			search={search}
			handleSearch={handleSearch}
		/>

      <h3>add a new</h3>
      <PersonForm
		handleSubmit={handleSubmit}
		newName={newName}
		handleNameChange={handleNameChange}
		newNumber={newNumber}
		handleNumberChange={handleNumberChange}
	  />
	  
      <h3>Numbers</h3>
      <Persons searchResults={searchResults}/>
    </div>
  )
}

export default App