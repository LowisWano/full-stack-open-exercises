
const calculateBmi = (height: number, weight: number) => { 
  const bmi =  weight / ((height/100) * (height/100));
  if(bmi < 18.5){
    return 'Underweight range'
  }else if(bmi <= 24.9){
    return 'Normal range'
  }else if(bmi <= 29.9){
    return 'Overweight range'
  }else{
    return 'Obesity range'
  }
}

console.log(calculateBmi(180, 74))



