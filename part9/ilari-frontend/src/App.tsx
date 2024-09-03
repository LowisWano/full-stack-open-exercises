import { useState, useEffect } from 'react'
import DiaryEntries from './components/DiaryEntries'
import { getAllDiaries } from './services/diaryService'
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
      <DiaryEntries diaries={diaries} />
    </>
  )
}

export default App
