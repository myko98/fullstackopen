import React from 'react'

const Notification = ({ message, colour }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`${colour == "green" ? 'green' : 'red'}`}>
      {message}
    </div>
    
  )
}

export default Notification