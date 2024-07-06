import { useState } from 'react'

const StatisticLine = ({text, value})=>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = (props) =>{
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = ({good, neutral, bad})=>{
  if(good + neutral + bad === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
      <table>
        <tbody>
        <StatisticLine value={good} text={"good"}/>
        <StatisticLine value={neutral} text={"neutral"}/>
        <StatisticLine value={bad} text={"bad"}/>
        <StatisticLine value={good + bad + neutral} text={"all"}/>
        <StatisticLine value={(good-bad)/(good + bad + neutral)} text={"average"}/>
        <StatisticLine value={(good/(good + bad + neutral))*100 + " %"} text={"positive"}/>
        </tbody>
      </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncrement = (value, setState) => {
    return () => setState(value + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleIncrement(good,setGood)} text={"good"}/>
      <Button handleClick={handleIncrement(neutral,setNeutral)} text={"neutral"}/>
      <Button handleClick={handleIncrement(bad,setBad)} text={"bad"}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App