import { useState, useEffect } from 'react'
import axios from 'axios'
function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [showNone, setShowNone] = useState(true)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
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
    const newCountries = countries.filter(country => country.name.substring(0, word.length).toLowerCase() == word.toLowerCase())
    if (newCountries.length > 10) {
      return (
        <h1>Too many matches, specify another filter</h1>
      )
    } else if (newCountries.length == 1) {

      return (
        <>
          {newCountries.map((country) => (
            <div>
              <h1>{country.name}</h1>
              <p>capital {country.capital}</p>
              <p>area {country.area}</p>

              <h2>languages</h2>
              <ul>
                {country.languages.map((language) => (
                  <li>{language.name}</li>
                ))}
              </ul>

              <img src={country.flag} alt=""/>
            </div>
          ))}
        </>
      )
    }
    return (
      <>
        {newCountries.map((country) => (
          <h1>{country.name}</h1>
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
