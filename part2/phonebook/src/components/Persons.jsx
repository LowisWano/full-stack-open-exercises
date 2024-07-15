import Person from './Person'

const Persons = ({searchResults, handleDelete})=>{
    return (
        <div>
            {   
                searchResults.map((person) => {
                    return <Person key={person.id} name={person.name} number={person.number} handleDelete={handleDelete} id={person.id}/>
                })
            }
        </div>
    );
}

export default Persons;