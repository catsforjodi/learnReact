import { useState } from 'react'
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) => {
  console.log("Display", props.all)
  if (props.all !== 0) {
    return(<div>{props.total}</div>)
  }
  return null
}

const Percentage = (props) => {
  if (props.all !== 0) {
    return(<div>{props.total}%</div>) 
  } 
  return null
}

const None = (props) => {
  if (props.all === 0) {
    return(
      <div>No feedback given</div>
    )
  }
  return null
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  const setGoodValue = (newValue) => () => {
    setGood(newValue)
  }

  const setNeutralValue = (newValue) => () => {
    setNeutral(newValue)
  }

  const setBadValue = (newValue) => () => {
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setGoodValue(good + 1)} text="good"/>
      <Button handleClick={setNeutralValue(neutral + 1)} text="neutral"/>
      <Button handleClick={setBadValue(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <None all={all}/>
      <table>
        <tr>
          <td>good</td>
          <td><Display total={good} all={all}/></td>
        </tr>
        <tr>
          <td>neutral</td>
          <td><Display total={neutral} all={all}/></td>
        </tr>
        <tr>
          <td>bad</td>
          <td><Display total={bad} all={all}/></td>
        </tr>
        <tr>
          <td>all</td>
          <td><Display total={all} all={all}/></td>
        </tr>
        <tr>
          <td>average</td>
          <td><Display total={((good - bad)/all).toFixed(1)} all={all}/></td>
        </tr>
        <tr>
          <td>positive</td>
          <td><Percentage total={(good/all*100).toFixed(1)} all={all}/></td>
        </tr>
      </table>
      
    </div>
  )
}
export default App;
