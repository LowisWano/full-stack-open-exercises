
const Form = ({ handleSubmit, handleSearch })=>{
    return(
        <form onSubmit={handleSubmit}>
            find countries
            <input type="text" onChange={handleSearch}/>
        </form>
    )
}

export default Form;