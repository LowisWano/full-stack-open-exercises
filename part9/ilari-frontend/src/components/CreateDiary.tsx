import { Dispatch, SetStateAction } from "react"
import { createDiaryEntry } from "../services/diaryService"
import { NewDiaryEntry, Diary } from "../types"

interface CreateDiaryProps{
  diaries: Diary[];
  setDiaries: Dispatch<SetStateAction<Diary[]>>
}

const CreateDiary = (props: CreateDiaryProps) => {

  const handleCreateDiarySubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const { diaries, setDiaries } = props
    const formData = event.target as HTMLFormElement
    const newDiary: NewDiaryEntry = {
      date: formData.date.value,
      weather: formData.weather.value,
      visibility: formData.visibility.value,
      comment: formData.comment.value
    }
    const createdDiary = await createDiaryEntry(newDiary)
    setDiaries(diaries.concat(createdDiary))
    formData.reset()
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={handleCreateDiarySubmit}>
        <p>date<input type="text" name="date"/></p>
        <p>visibility<input type="text" name="visibility"/></p>
        <p>weather<input type="text" name="weather"/></p>
        <p>comment<input type="text" name="comment"/></p>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default CreateDiary