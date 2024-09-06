import {  useState, useEffect } from 'react'
import { getAllDiaries } from './services/diaryService'
import DiaryEntries from './components/DiaryEntries'
import CreateDiary from './components/CreateDiary'
import { Diary } from './types'

function App() {

  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    getAllDiaries().then((response)=>{
      setDiaries(response)
    })
  }, [])

  return (
    <>
      <CreateDiary diaries={diaries} setDiaries={setDiaries} />
      <DiaryEntries diaries={diaries} />
    </>
  )
}

export default App
