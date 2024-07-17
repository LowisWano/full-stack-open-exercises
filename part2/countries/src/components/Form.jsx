
const Form = ({ submitHandler })=>{
    return(
        <form onSubmit={submitHandler}>
            find countries
            <input type="text" />
        </form>
    )
}

export default Form;