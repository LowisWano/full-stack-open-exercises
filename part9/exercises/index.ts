import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber } from './utils/isNotNumber';

const app = express();
app.use(express.json());

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);
  if(!height || !weight){
    return response.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(height, weight);
  return response.json({
    height,
    weight,
    bmi
  });
});

app.post('/exercises', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = request.body;

  if(!daily_exercises||!target){
    return response.status(400).json({ error: 'parameters missing' });
  }

  if(isNotNumber(target) || !(daily_exercises instanceof Array) || daily_exercises.some((day)=>isNotNumber(day)) ){
    return response.status(404).json({ error: 'malformatted parameters' });
  }
  
  const statistics = calculateExercises(daily_exercises.map((day)=>Number(day)), Number(target));

  return response.json(statistics);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});