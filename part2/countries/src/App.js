import { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'
import Details from './components/Details'


function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [showNone, setShowNone] = useState(true)
  const [temp, setTemp] = useState([])
  const [wind, setWind] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {

        const finalList = response.data;

        //set a visibility property to all items in array
        const newCountries = finalList.map((country) => ({ ...country, visibility: 'none' }))

        setCountries(newCountries)
      })


  }, [])

  const filterCountry = (event) => {
    if (event.target.value.length > 0) {
      setShowNone(false)
    } else {
      setShowNone(true)
    }
    setFilter(event.target.value)
  }

  const filteredCountries = (word) => {
    //not a state
    let newCountries = countries.filter(country => country.name.substring(0, word.length).toLowerCase() == word.toLowerCase())

    //if search filter gives more than 10 results
    if (newCountries.length > 10) {
      return (
        <h1>Too many matches, specify another filter</h1>
      )
    }

    //if search filter gives exactly 1 result, we give that country's info
    else if (newCountries.length == 1) {

      newCountries = newCountries.map((country) => ({ ...country, visibility: 'show' }))

      const lat = newCountries[0].latlng[0]
      const lng = newCountries[0].latlng[1]

      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=2f16fda48f4492d5907280b0b72cb154&units=metric`)
      .then(response => {
        console.log(response.data)

        setTemp(response.data.main.temp)
        setWind(response.data.wind.speed)
      }, [])

      return (
        <>
          {newCountries.map((country) => (
            <>
              <h1>{country.name}</h1>
              <Details country={country} />
              <h1>Weather in {country.capital}</h1>
              <p>temperature {temp}</p>
              
              <p>wind {wind}</p>

            </>

          ))}
        </>
      )
    }

    const showDetails = (country) => {

      const newCountries = countries.map((place) => {

        if (country.name == place.name) {
          if (country.visibility == 'none') {
            return { ...place, visibility: "show" }
          } else if (country.visibility == 'show') {
            return { ...place, visibility: "none" }
          }
        }
        return place
      })

      setCountries(newCountries)

    }
    return (
      <>
        {newCountries.map((country) => (
          <div>
            <h1 style={{ display: 'inline-block' }}>{country.name}</h1>
            <button onClick={() => showDetails(country)}>show</button>
            <Details country={country} />

          </div>
        ))}
      </>
    )
  }

  const allCountries = () => {
    return (
      <>
        {countries.map((country) => (
          <h1>{country.name}</h1>
        ))}
      </>
    )
  }

  const showCountries = showNone
    ? allCountries()
    : filteredCountries(filter)

  return (
    <div className="App">
      <p>find countries <input onChange={filterCountry} type="text" /></p>

      {showCountries}
    </div>
  );
}

export default App;
