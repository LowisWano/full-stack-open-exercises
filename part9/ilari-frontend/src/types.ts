
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
}