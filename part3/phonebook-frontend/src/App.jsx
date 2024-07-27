import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

/*
copy entire current frontend dir to part 3
find the last commit for part 2 phonebook and revert it
*/
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

  const displayNotif = (type, message)=>{
    setNotifType(type);
    setNotifMessage(message)
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000);
  }

  const setPersonData = (personData)=>{
    setPersons(personData);
		setSearchResult(personData);
  }

  const clearInputFields = ()=>{
    setNewName('');
		setNewNumber('');
  }
	
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
					setPersonData(updatedPersons);
          displayNotif('success', `${newName}'s number has been updated`);
					clearInputFields();
				}).catch(error => {
          displayNotif('error', error.response.data.error);
				})
			}
		}else{
			personService.create({
				name: newName,
				number: newNumber
			})
			.then(response=>{
				const updatedPersons = persons.concat(response);
				setPersonData(updatedPersons);
        displayNotif('success', `Added ${newName}`);
				clearInputFields();
			})
      .catch(error=>{
        displayNotif('error', error.response.data.error);
      })
		}
	}

	const handleDelete = (personObj)=>{
		if(window.confirm(`Delete ${personObj.name} ?`)){
			personService.deletePerson(personObj.id)
			.then((response)=>{
				const updatedPersons = persons.filter((person)=>person.id!==personObj.id);
				setPersonData(updatedPersons);
			})
			.catch(error => {
        displayNotif('error', `Information of ${personObj.name} has already been removed from server`);
        setPersonData(persons.filter((person)=>person.id!=personObj.id));
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