import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

let points = [0, 0, 0, 0, 0, 0]

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [allVotes, setAll] = useState(points)

  const changeVotesNo = (selected) => () => {
    let copy = [...points]
      copy[selected] += 1
      points = copy.slice(0)
    setAll(copy)
  }

  return (
    <div>
      <h1>
      Anecdote of the day
      </h1>
      {props.anecdotes[selected]}
      <br />
      has {allVotes[selected]} votes
      <br />
      <Button onClick={changeVotesNo(selected)} text='vote' />
      <Button onClick={() => {setSelected(selected + 1)}} text='next anecdote' />
      <h1>
      Anecdote with the most votes
      </h1>
      {props.anecdotes[indexOfMax(points)]}
      <br />
      has {allVotes[indexOfMax(points)]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
