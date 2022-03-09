import React from 'react'

const Details = ({ country,latlng }) => {

  if (country.visibility == 'none') {
    return (null)
  }
  return (
    <div>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li>{language.name}</li>
        ))}
      </ul>

      <img className="imgSize" src={country.flag} alt="" />
    </div>
  )
}

export default Details