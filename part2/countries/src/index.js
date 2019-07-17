import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Filter = (props) => {

  const handleFilterChange = (event) => {
    props.set(event.target.value)
  }

  return (
    <div>
      find countries: <input value={props.new} onChange={handleFilterChange} />
    </div>
  )
}

const Countries = (props) => {

  function filterItems(query) {
    return props.countries.filter(function(el) {
        return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
  }

  const rows = () => filterItems(props.newFi).map((country, i) =>
      <div key={i}>
        {country.name}
      </div>
  )

  return (
    <div>
      <br/>
      {(filterItems(props.newFi).length > 10) ? <div>Too many matches, specify another filter</div> : rows()}
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([{ name: ''}])
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
}, [])

  return (
    <div>
      <Filter set={setNewFilter} new={newFilter}/>
      <Countries countries={countries} newFi={newFilter}/>
    </div>
  )
}

export default App
ReactDOM.render(<App />, document.getElementById('root'));
