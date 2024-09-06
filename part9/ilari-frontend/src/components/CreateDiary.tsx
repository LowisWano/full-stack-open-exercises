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
      console.log(createdDiary)
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
        <p>date<input type="date" name="date"/></p>

        <div>
          <p>visibility</p>
          <input type="radio" id="great" name="visibility" value="great" />
          <label htmlFor="great">great</label>

          <input type="radio" id="good" name="visibility" value="good" />
          <label htmlFor="good">good</label>

          <input type="radio" id="ok" name="visibility" value="ok" />
          <label htmlFor="ok">ok</label>

          <input type="radio" id="poor" name="visibility" value="poor" />
          <label htmlFor="poor">poor</label>
        </div>
        
        <div>
          <p>weather</p>
          <input type="radio" id="sunny" name="weather" value="sunny" />
          <label htmlFor="sunny">sunny</label>

          <input type="radio" id="rainy" name="weather" value="rainy" />
          <label htmlFor="rainy">rainy</label>

          <input type="radio" id="cloudy" name="weather" value="cloudy" />
          <label htmlFor="cloudy">cloudy</label>

          <input type="radio" id="stormy" name="weather" value="stormy" />
          <label htmlFor="stormy">stormy</label>

          <input type="radio" id="windy" name="weather" value="windy" />
          <label htmlFor="windy">windy</label>
        </div>
     
        <p>comment<input type="text" name="comment"/></p>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default CreateDiary