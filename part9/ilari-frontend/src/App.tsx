import { useState, useEffect } from 'react'
import { getAllDiaries } from './services/diaryService'
import { Diary } from './types'

import DiaryEntries from './components/DiaryEntries'
import CreateDiary from './components/CreateDiary'

function App() {

  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    getAllDiaries().then((response)=>{
      setDiaries(response)
    })
  }, [])

  return (
    <>
      <CreateDiary/>
      <DiaryEntries diaries={diaries} />
    </>
  )
}

export default App
