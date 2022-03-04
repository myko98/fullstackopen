import React from 'react'

const Form = ({add, inputNumber,inputName, newName, newNumber}) => {


  return (
    <form onSubmit={add}>
      <div>
        name: <input onChange={inputName} placeholder="input name here" value={newName} />
        <br></br>
          number: <input onChange={inputNumber} placeholder="input number here" value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form