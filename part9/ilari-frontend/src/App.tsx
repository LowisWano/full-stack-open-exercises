import {  useState, useEffect } from 'react'
import { getAllDiaries } from './services/diaryService'
import { Diary, NotifType } from './types'

import DiaryEntries from './components/DiaryEntries'
import CreateDiary from './components/CreateDiary'


function App() {

  const [diaries, setDiaries] = useState<Diary[]>([])
  const [notif, setNotif] = useState<NotifType>(null)

  useEffect(() => {
    getAllDiaries().then((response)=>{
      setDiaries(response)
    })
  }, [])

  return (
    <>
      <CreateDiary diaries={diaries} setDiaries={setDiaries} notif={notif} setNotif={setNotif}/>
      <DiaryEntries diaries={diaries} />
    </>
  )
}

export default App
