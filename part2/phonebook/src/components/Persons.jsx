import Person from './Person'

const Persons = ({searchResults})=>{
    return (
        <div>
            {   
                searchResults.map((person) => {
                    return <Person key={person.id} name={person.name} number={person.number}/>
                })
            }
        </div>
    );
}

export default Persons