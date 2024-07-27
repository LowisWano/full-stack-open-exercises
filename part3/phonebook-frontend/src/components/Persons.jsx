import Person from './Person'

const Persons = ({searchResults, handleDelete})=>{
    return (
        <div>
            {   
                searchResults.map((person) => {
                    return <Person key={person.id} handleDelete={handleDelete} person={person}/>
                })
            }
        </div>
    );
}

export default Persons;