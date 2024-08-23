interface exerciseStatistics { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (schedule: number[], target: number): exerciseStatistics => {
  const daysActive: number = schedule.filter((day) => day != 0).length
  let rating: number;
  let desc: string;
  if(daysActive === schedule.length) {
    desc = 'great job!'
    rating = 3;
  } else if(daysActive === 0){
    desc = 'you failed to exercise this week'
    rating = 1;
  }else{
    desc = 'not too bad but could be better'
    rating = 2;
  }
  const average: number = schedule.reduce((total, curr) => total + curr) / schedule.length

  const statistics: exerciseStatistics = {
    periodLength: 7,
    trainingDays: daysActive,
    success: daysActive === schedule.length ? true: false,
    rating: rating,
    ratingDescription: desc,
    target: target,
    average: average
  }

  return statistics;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))