import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = (props) => {
  return(
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )
}

const Statistics = (props) => {
  if ((props.good+props.neutral+props.bad) === 0) {
    return (
      <div>
        No feedbacks given
      </div>
    )
  }
  else {
    return(
        <table>
          <tbody>
            <Statistic text="good" value ={props.good} />
            <Statistic text="neutral" value ={props.neutral} />
            <Statistic text="bad" value ={props.bad} />
            <Statistic text="all" value ={props.all} />
            <Statistic text="average" value ={props.average} />
            <Statistic text="positive" value ={props.positive} />
          </tbody>
        </table>
      )
    }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const setToPositive = () => {
    setPositive(good/(good+neutral+bad))
  }

  const setToAverage = () => {
    setAverage(all/(good+neutral+bad))
  }

  const handleGoodFeedback = () => {
    setGood(good + 1)
    setAll(all + 1)
    setToPositive()
    setToAverage()
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
    setAll(all + 0)
    setToPositive()
    setToAverage()
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
    setAll(all - 1)
    setToPositive()
    setToAverage()
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodFeedback} text='good' />
      <Button onClick={handleNeutralFeedback} text='neutral' />
      <Button onClick={handleBadFeedback} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} positive={positive+ '%'} average={average} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
