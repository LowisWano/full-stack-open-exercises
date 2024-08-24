import { isNotNumber } from "./utils/isNotNumber";

interface userInput {
  target: number;
  schedule: number[];
}

const parseArguments = (args: string[]): userInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const schedule = args.slice(3).map((arg) => Number(arg));
  
  if(isNotNumber(target) || schedule.some((arg) => isNotNumber(arg))){
    throw new Error('Provided values were not numbers!');
  }

  return {
    target,
    schedule
  };
};

interface exerciseStatistics { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (schedule: number[], target: number): exerciseStatistics => {
  const daysActive: number = schedule.filter((day) => day != 0).length;
  const daysTargetAchieved: number = schedule.filter((day)=>day>=target).length;
  let rating: number;
  let desc: string;
  if(daysTargetAchieved === schedule.length) {
    desc = 'great job!';
    rating = 3;
  } else if(daysTargetAchieved < 4){ 
    desc = 'bad';
    rating = 1;
  }else{
    desc = 'not too bad but could be better';
    rating = 2;
  }
  const average: number = schedule.reduce((total, curr) => total + curr) / schedule.length;

  const statistics: exerciseStatistics = {
    periodLength: schedule.length,
    trainingDays: daysActive,
    success: rating === 3 ? true : false,
    rating: rating,
    ratingDescription: desc,
    target: target,
    average: average
  };

  return statistics;
};

if(require.main === module){
  try{
    const { target, schedule } = parseArguments(process.argv);
    console.log(calculateExercises(schedule, target));
  }catch (error: unknown){
    if(error instanceof Error){
      console.log(`Something bad happened. Error: ${error.message}`);
    }
  }
}