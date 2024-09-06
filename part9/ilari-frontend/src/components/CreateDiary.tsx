import { Dispatch, SetStateAction } from "react"
import { createDiaryEntry } from "../services/diaryService"
import { Diary, NotifType } from "../types"
import axios from "axios"
import Notification from '../components/Notification'

interface CreateDiaryProps{
  diaries: Diary[]
  setDiaries: Dispatch<SetStateAction<Diary[]>>
  notif: NotifType
  setNotif: Dispatch<SetStateAction<NotifType>>
}

const CreateDiary = ({ diaries, setDiaries, notif, setNotif }: CreateDiaryProps) => {

  const handleCreateDiarySubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const formData = event.target as HTMLFormElement

    try{
      const createdDiary = await createDiaryEntry({
        date: formData.date.value,
        weather: formData.weather.value,
        visibility: formData.visibility.value,
        comment: formData.comment.value
      })

      setDiaries(diaries.concat(createdDiary))
      formData.reset()
    }catch(error){
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data)
        setNotif(error.response?.data)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <Notification notif={notif}/>
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