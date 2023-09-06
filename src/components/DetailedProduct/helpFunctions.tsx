import React from 'react'
import { getProductById } from 'utils/requests'
import { Attribute, Price } from '@commercetools/platform-sdk'

export interface Product {
  name: string
  images: string[]
  description: string
  id: string
  prices: Price[] | undefined
  attributes: Attribute[] | undefined
}

export async function getProduct(id: string, callback: (arg: Product) => void) {
  const response = (await getProductById(id))[0]
  console.log(response)
  callback(response)
}

export const arrowStyle = (isOpen: boolean) =>
  isOpen ? 'product-features__arrow arrow-opened' : 'product-features__arrow'

export const handlePrice = (priceArray: Price[] | undefined) => {
  if (priceArray === undefined) return 0
  const price = priceArray.find((el) => el.country === 'US')
  return price ? (price.value.centAmount / 100).toFixed(2) : 0
}

export const handleAttributes = (attrArray: Attribute[] | undefined) => {
  if (attrArray === undefined) {
    return
  } else {
    const result: Attribute[] = []
    attrArray.forEach((attribute) => {
      if (typeof attribute.value === 'string') result.push(attribute)
    })
    return result.map((attribute, index) => (
      <li key={index}>
        <span>{attribute.name}</span>: <span>{attribute.value}</span>
      </li>
    ))
  }
}
