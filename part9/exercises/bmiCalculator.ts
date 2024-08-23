import { isNotNumber } from "./utils/isNotNumber";

interface userInput {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): userInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if(isNotNumber(args[2]) || isNotNumber(args[3])){
    throw new Error('Provided values were not numbers!');
  }
  
  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
}


const calculateBmi = (height: number, weight: number) => { 
  const bmi =  weight / ((height/100) * (height/100));
  if(bmi < 18.5){
    return 'Underweight';
  }else if(bmi <= 24.9){
    return 'Normal range';
  }else if(bmi <= 29.9){
    return 'Overweight';
  }else{
    return 'Obese';
  }
}

try{
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
}catch (error: unknown){
  if(error instanceof Error){
    console.log(`Something bad happened. Error: ${error.message}`)
  }
}






