import React from 'react'
import { getProductsFromApi } from 'utils/requests'

export default function Api2() {
  const handleClick = () => {
    getProductsFromApi(20)
  }
  return <button onClick={handleClick}>Get Request</button>
}
