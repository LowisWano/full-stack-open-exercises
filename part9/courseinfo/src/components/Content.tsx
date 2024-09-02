
interface ContentType{
  name: string;
  exerciseCount: number;
}

const Content = ({ parts }: { parts: ContentType[] }) => {
  return (
    <>
      {
        parts.map((part) => (
          <p key={part.name} >
            {part.name} {part.exerciseCount}
          </p>
        ))
      }
    </>
  )
}

export default Content;