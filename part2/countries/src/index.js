import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Filter = (props) => {

  const handleFilterChange = (event) => {
    props.set(event.target.value)
  }

  return (
    <div>
      filter shown with: <input value={props.new} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {

  const handleNameChange = (event) => {
    props.setNa(event.target.value)
  }
  const handleNumberChange = (event) => {
    props.setNo(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: props.newNa,
      number: props.newNo,
      date: new Date().toISOString(),
      id: props.newPe.length + 1,
    }
    let found = props.newPe.find(function(element) {
      return (element.name === props.newNa)
      });
    if (found === undefined) {
      props.setPe(props.newPe.concat(personObject))
      props.setNa('')
      props.setNo('')
    }
    else {
      alert(props.newNa + ' is already added to phonebook')
      props.setNa('')
      props.setNo('')
    }
  }

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>name: <input value={props.newNa} onChange={handleNameChange} /></div>
        <div>number: <input value={props.newNo} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

const Persons = (props) => {

  function filterItems(query) {
    return props.persons.filter(function(el) {
        return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
  }

  const rows = () => filterItems(props.newFi).map(person =>
    <div key={person.id}>
      {person.name} {person.number}
    </div>
  )

  return (
    <div>
      <br/>
      {rows()}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '99632-1057', date: "2019-07-01T00:00:00.334Z", id: 1 }
  ])
  const [ newName, setNewName ] = useState('write name here...')
  const [ newNumber, setNewNumber ] = useState('write number here...')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
}, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter set={setNewFilter} new={newFilter} />
      <h3>add a new</h3>
      <PersonForm setNo={setNewNumber} newNo={newNumber} setNa={setNewName} newNa={newName} newPe={persons} setPe={setPersons} />
      <Persons persons={persons} newFi={newFilter} />
    </div>
  )
}

export default App
ReactDOM.render(<App />, document.getElementById('root'));
