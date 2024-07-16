import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearchField] = useState('');
	const [searchResults, setSearchResult] = useState(persons);
	const [notifMessage, setNotifMessage] = useState();
	const [notifType, setNotifType] = useState('');

	useEffect(()=>{
		personService.getAll()
		.then(response=>{
			setPersons(response);
			setSearchResult(response);
		})
	},[])
	
	// put catch handlers in case of error for update and delete
	const handleSubmit = (event)=>{
		event.preventDefault();
		const match = persons.find((person) => person.name === newName);

		if(match){
			if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
				personService.update(match.id, {
					...match,
					number: newNumber
				})	
				.then(returnedPerson=>{
					const updatedPersons = persons.map(person=>person.id !== match.id ? person: returnedPerson);
					setPersons(updatedPersons);
					setSearchResult(updatedPersons);
					setNewName('');
					setNewNumber('');
				}).catch(error => {
					setNotifType('error')
					setNotifMessage(`Information of ${newName} has already been removed from server`);
					setPersons(persons.filter((person)=>person.id!=match.id));
					setSearchResult(persons.filter((person)=>person.id!=match.id));
					
					setTimeout(() => {
						setNotifMessage(null)
					}, 5000);
				})
			}
		}else{
			personService.create({
				name: newName,
				number: newNumber
			})
			.then(response=>{
				const updatedPersons = persons.concat(response);
				setPersons(updatedPersons);
				setSearchResult(updatedPersons);

				setNotifType('success')
				setNotifMessage(`Added ${newName}`);
				setTimeout(() => {
					setNotifMessage(null)
				}, 5000);
				setNewName('');
				setNewNumber('');
			})
		}
	}

	const handleDelete = (personObj)=>{
		if(window.confirm(`Delete ${personObj.name} ?`)){
			personService.deletePerson(personObj.id)
			.then((response)=>{
				const updatedPersons = persons.filter((person)=>person.id!=response.id);
				setPersons(updatedPersons);
				setSearchResult(updatedPersons);
			})
			.catch(error => {
				setNotifType('error')
				setNotifMessage(`Information of ${personObj.name} has already been removed from server`);
				setPersons(persons.filter((person)=>person.id!=personObj.id));
				setSearchResult(persons.filter((person)=>person.id!=personObj.id));
				
				setTimeout(() => {
					setNotifMessage(null)
				}, 5000);
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

  return (
    <div>
      <h2>Phonebook</h2>
	  	<Notification
			message={notifMessage}
			notifType={notifType}
		/>
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