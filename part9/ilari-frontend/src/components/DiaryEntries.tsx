import { Diary } from "../types"

const DiaryEntries = ({ diaries }: { diaries: Diary[] }) => {
  return(
    <>
      <h1>Diary entries</h1>
      {
        diaries.map((diary) => (
          <div key={diary.id}>
            <h2>{diary.date}</h2>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </div>
        ))
      }
    </>
  )
}

export default DiaryEntries