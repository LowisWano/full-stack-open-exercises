import axios from "axios";
import { Diary, NewDiaryEntry } from "../types";

const DIARY_API = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {
  const response = await axios.get<Diary[]>(DIARY_API)
  return response.data
}

export const createDiaryEntry = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post<Diary>(DIARY_API, newDiary);
  return response.data;
}