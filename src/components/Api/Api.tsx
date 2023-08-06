import React from 'react'
import { getToken } from 'utils/requests'

export default function Api() {
  const handleClick = () => {
    getToken()
  }
  return <button onClick={handleClick}>Get Token</button>
}
