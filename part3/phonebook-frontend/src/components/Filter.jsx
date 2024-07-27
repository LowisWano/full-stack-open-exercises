const Filter = (props)=>{
    return (
        <form onSubmit={props.handleSearchSubmit}>
        <div>filter shown with </div>
        <input value={props.search} onChange={props.handleSearch}/>
      </form>
    )
}

export default Filter;