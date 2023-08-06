import React from 'react'
import { makeApiCall } from 'utils/requests'

export default function Api2() {
  const handleClick = () => {
    makeApiCall()
  }
  return <button onClick={handleClick}>Get Request</button>
}
