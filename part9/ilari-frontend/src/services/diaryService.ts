import axios from "axios";
import { Diary } from "../types";

const DIARY_API = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {
  const response = await axios.get<Diary[]>(DIARY_API)
  return response.data
}

