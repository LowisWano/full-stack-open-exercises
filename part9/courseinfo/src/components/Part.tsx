import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  switch(part.kind){
    case "basic":
      return(
        <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
        </>
      )
    case "group":
      return(
        <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>project exercises: {part.groupProjectCount}</p>
        </>
      )
    case "background":
      return(
        <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>submit to {part.backgroundMaterial}</p>
        </>
      )
    case "special":
      return(
        <>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </>
      )
    default:
      return assertNever(part)
  }
}

export default Part 