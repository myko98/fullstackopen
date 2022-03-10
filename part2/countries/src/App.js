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
  const [weatherIcon, setWeatherIcon] = useState("")

  //useEffect will only run once when app initially loads and sets 'countries' state to be an array of all countries from restcountries
  //will also add the property 'visibility' to every country so that details will be hidden initially
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

  //callback function that changes 'showNone' state to false when input field value is greater than 0, else set to true
  //'showNone' acts as our binary switch that either outputs the entire list of countries if true, or we output the filtered list if false
  //then set 'filter' state to input field value
  const filterCountry = (event) => {

    //using ternary operator more instead of if statements!
    (event.target.value.length > 0) 
      ? setShowNone(false)
      : setShowNone(true)

    setFilter(event.target.value)
  }

  const filteredCountries = (word) => {
    let newCountries = countries.filter(country => country.name.substring(0, word.length).toLowerCase() == word.toLowerCase())

    //if search filter gives more than 10 results
    if (newCountries.length > 10) {
      return (
        <h1>Too many matches, specify another filter</h1>
      )
    }

    //if search filter gives exactly 1 result, we give that country's info
    else if (newCountries.length == 1) {

      const { REACT_APP_WEATHER_KEY } = process.env
      newCountries = newCountries.map((country) => ({ ...country, visibility: 'show' }))

      const lat = newCountries[0].latlng[0]
      const lng = newCountries[0].latlng[1]

      //grab data from weather API
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${REACT_APP_WEATHER_KEY}&units=metric`)
        .then(response => {
          console.log(response.data)

          setTemp(response.data.main.temp)
          setWind(response.data.wind.speed)
          setWeatherIcon(response.data.weather[0].icon)
          console.log(weatherIcon)
        }, [])

      return (
        <>
          {newCountries.map((country) => (
            <>
              <h1>{country.name}</h1>
              <Details country={country} />
              <h1>Weather in {country.capital}</h1>
              <p>temperature {temp}</p>
              <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="" />
              <p>wind {wind}</p>

            </>

          ))}
        </>
      )
    }

    //when we have between 1-10 results, every country will have a show button
    //when clicked, show button will change the visibility property between 'show' and 'none' by mapping through our current 'countries' state
    //we then update our countries state by using 'setCountries'
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
