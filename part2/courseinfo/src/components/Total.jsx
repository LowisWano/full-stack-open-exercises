const Total = ({ parts }) =>{
    return (
      <div>
        <strong>
            total of {parts.reduce((sum, part)=>{
                return sum + part.exercises;
            }, 0)} exercises
        </strong>
      </div>
    )
  }

export default Total;