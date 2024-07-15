const Person = ({ name, number, handleDelete, id})=>{
    return (
        <>
            <p>{name} {number}
            <button onClick={()=>handleDelete(id)}>delete</button>
            </p>
            
        </>
    )
}

export default Person;