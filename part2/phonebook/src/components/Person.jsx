const Person = ({ handleDelete, person })=>{
    return (
        <>
            <p>{person.name} {person.number}
            <button onClick={()=>handleDelete(person)}>delete</button>
            </p>
            
        </>
    )
}

export default Person;