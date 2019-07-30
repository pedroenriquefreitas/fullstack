import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'
import axios from 'axios'
import './index.css'

const Alert = (props) => {

  if (props.alert === null) {
    return null
  }

  const goodAlertStyle = {
    color: '#23db79'
  }

  const badAlertStyle = {
    color: '#eb4034'
  }

  if (props.alertGood) {
    return (
      <div className="error" style={goodAlertStyle} >
        {props.alert}
      </div>
    )
  }
  else {
    return (
      <div className="error" style={badAlertStyle} >
        {props.alert}
      </div>
    )
  }
}

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
      id: Math.floor((Math.random() * 1000) + 1),
    }
    let found = props.newPe.find(function(element) {
      return (element.name === props.newNa)
      })

    if (found === undefined) {
      props.setPe(props.newPe.concat(personObject))
      personService.create(personObject)
      props.setAlGood(true)
      props.setAl(`Added ${props.newNa}`)
      props.setNa('')
      props.setNo('')
      setTimeout(() => {
          props.setAl(null)
        }, 5000)
    }
    else {
      let result2 = window.confirm(`${props.newNa} is already added to the phonebook, replace the older number to a new one?`)
      if (result2 === true){
        let id_user = props.newPe.find(x => x.name === props.newNa).id
        let copy = props.newPe
        personService.update( id_user ,{ ...personObject, id: id_user})
        .then(returnedPerson => {
        let removeIndex = props.newPe.map(function(item) { return item.id; }).indexOf(id_user)
        console.log(copy)
        copy[removeIndex].number = props.newNo
        props.setPe(copy)
        props.setNa('')
        props.setNo('')
        })
      }
      else {
      props.setNa('')
      props.setNo('')
      }
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

  const deletePerson = (id) => {
    let result = window.confirm('Confirm deletion?')
    if (result === true){
      let copy2 = props.persons.concat([])
      let deletionIndex = props.persons.map(function(item) { return item.id }).indexOf(id)
      personService.delete_person(id).catch(error => {
        props.setAlGood(false)
        props.setAl(`Information of ${props.persons[deletionIndex].name} has already been removed from the server`)
        setTimeout(() => {
            props.setAl(null)
          }, 5000)
      })
      copy2.splice(deletionIndex, 1)
      props.setPe(copy2)
    }
  }

  const rows = () => filterItems(props.newFi).map(person =>
    <div key={person.id}>
      {person.name} {person.number} <button onClick={ () => deletePerson(person.id) } >delete</button>
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
  const [ newAlert, setNewAlert ] = useState(null)
  const [ alertGood, setAlertGood ] = useState(false)

  useEffect(() => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
      console.log(response.data)
    })
}, [])

  useEffect(() => {
  console.log("State of Persons has changed")
  }, [persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Alert alert={newAlert} alertGood={alertGood} />
      <Filter set={setNewFilter} new={newFilter} />
      <h3>add a new</h3>
      <PersonForm setNo={setNewNumber} newNo={newNumber} setNa={setNewName} newNa={newName} newPe={persons} setPe={setPersons} setAl={setNewAlert} setAlGood={setAlertGood}/>
      <Persons persons={persons} setPe={setPersons} newFi={newFilter} setAl={setNewAlert} setAlGood={setAlertGood} />
    </div>
  )
}

export default App
ReactDOM.render(<App />, document.getElementById('root'));
