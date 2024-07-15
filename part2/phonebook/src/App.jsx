import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearchField] = useState('');
	const [searchResults, setSearchResult] = useState(persons);

	useEffect(()=>{
		personService.getAll()
		.then(response=>{
			setPersons(response);
			setSearchResult(response);
		})
	},[])
	

	const handleSubmit = (event)=>{
		event.preventDefault();
		const match = persons.find((person) => person.name === newName); 

		if(match){
			if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
				const updatedPerson = {
					...match,
					number: newNumber
				}
				personService.update(match.id, updatedPerson)
				.then(returnedPerson=>{
					const updatedPersons = persons.map(person=>person.id !== match.id ? person: returnedPerson);
					setPersons(updatedPersons);
					setSearchResult(updatedPersons);
					setNewName('');
					setNewNumber('');
				})
			}
		}else{
			const newPerson = {
				name: newName,
				number: newNumber
			}

			personService.create(newPerson)
			.then(response=>{
				const updatedPersons = persons.concat(response);
				setPersons(updatedPersons);
				setSearchResult(updatedPersons);
				setNewName('');
				setNewNumber('');
			})
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

	const handleDelete = (personObj)=>{
		console.log(personObj);
		if(window.confirm(`Delete ${personObj.name} ?`)){
			personService.deletePerson(personObj.id)
			.then((response)=>{
				const updatedPersons = persons.filter((person)=>person.id!=response.id);
				setPersons(updatedPersons);
				setSearchResult(updatedPersons);
			})
		}
		
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
      <Persons searchResults={searchResults} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;