import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', date: "2019-07-01T00:00:00.334Z", id: 1 }
  ])
  const [ newName, setNewName ] = useState('write here...')

  const rows = () => persons.map(person =>
    <div key={person.id}>
      {person.name}
    </div>
  )

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      date: new Date().toISOString(),
      id: persons.length + 1,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
}

  const handlePersonAdded = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonAdded} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )
}

export default App
ReactDOM.render(<App />, document.getElementById('root'));
