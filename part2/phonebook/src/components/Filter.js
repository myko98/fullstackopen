import React from 'react'

const Filter = ({showNames}) => {

  console.log(showNames)
  return (
    <>
    <p>filter shown with <input  onChange={showNames}type="text" /></p>
    </>
  )
}

export default Filter