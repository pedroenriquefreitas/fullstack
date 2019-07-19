import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Filter = (props) => {

  const handleFilterChange = (event) => {
    props.set(event.target.value)
    props.setShow(true)
  }

  return (
    <div>
      find countries: <input value={props.new} onChange={handleFilterChange} />
    </div>
  )
}

const Button = ({ onClick }) => (
  <button onClick={onClick}>
    show
  </button>
)

const Country = (props) => {

  const [ newWeather, setNewWeather ] = useState([{location: { name: ''}, current: { temp_f: ''}}])
  const [ render, setRender ] = useState(false)

  const languages = () => props.country.languages.map((language, i) =>
    <li key={i}>
      {language.name}
    </li>
  )

  const url = 'http://api.apixu.com/v1/current.json?key=fc55982549984c9ca1a204447191807&q=' + props.country.name

  axios
    .get(url)
    .then(response => {
      console.log('promise fulfilled 2')
      setNewWeather(response.data)
      setRender(true)
    })

  console.log(newWeather.location)

    return (
    <div>
      <h1>{props.country.name}</h1>
      capital {props.country.capital}<br/>
      population {props.country.population}<br/>
      <h3>languages</h3>
      <ul>
      {languages()}
      </ul>
      <img src={props.country.flag} alt="country-flag" style={{ height: "calc(100vh - 650px)"}}/>
      { render ?
        <div>
          <h3>Weather in {newWeather.location.name}</h3>
          <b>temperature:</b> {newWeather.current.temp_c} Celsius
          <br/><img src={newWeather.current.condition.icon} alt="temp-condition"/>
          <br/><b>wind:</b> {newWeather.current.wind_kph} kph direction {newWeather.current.wind_dir}
        </div>
          : ''}
    </div>
  )
}

const Countries = (props) => {

  function filterItems(query) {
    return props.countries.filter(function(el) {
        return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
  }

  const displayCountry = (country) => () => {
    props.setFi(country.name)
  }

  const rows = () => filterItems(props.newFi).map((country, i) =>
      <div key={i}>
        {country.name} <Button onClick={displayCountry(country)} />
      </div>
  )

  const showListCountries = () => {
    if (filterItems(props.newFi).length > 10) {
      return (
      <div>Too many matches, specify another filter</div>
        )
      }
    else if ((filterItems(props.newFi).length === 1) && (props.Show === true)) {
      return (
      <Country country={filterItems(props.newFi)[0]} />
      )
    }
    else {
      return (
      <div>
      {rows()}
      </div>
      )
    }
  }

  return (
    <div>
      <br/>
      {showListCountries()}
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([{ name: '', languages: [{name: ''}]}])
  const [ newFilter, setNewFilter ] = useState('')
  const [ showCountry, setShowCountry ] = useState(false)

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
      <Filter set={setNewFilter} new={newFilter} setShow={setShowCountry} />
      <Countries countries={countries} newFi={newFilter} setFi={setNewFilter} Show={showCountry} />
    </div>
  )
}

export default App
ReactDOM.render(<App />, document.getElementById('root'));
