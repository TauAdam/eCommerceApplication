import React from 'react'
import { Link } from 'react-router-dom'

function MainButton() {
  return (
    <Link to="/">
      <button>Go to Main</button>
    </Link>
  )
}

export default MainButton
