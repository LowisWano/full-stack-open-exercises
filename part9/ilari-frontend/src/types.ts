
export enum Weather {
  Sunny = "sunny",
  Cloudy = "cloudy",
  Windy = "windy",
  Rainy = "rainy",
}

export enum Visibility {
  Good = "good",
  Poor = "poor"
}

export type Diary = {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NotifType = string | null

export type NewDiaryEntry = Omit<Diary, 'id'>