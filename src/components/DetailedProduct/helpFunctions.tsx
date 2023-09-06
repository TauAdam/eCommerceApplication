import { Attribute } from '@commercetools/platform-sdk'
import React from 'react'
import { getProductById } from 'utils/requests'
import { IProduct } from '../share/types'

export async function getProduct(id: string, callback: (arg: IProduct) => void) {
  const response = (await getProductById(id))[0]
  console.log(response)
  callback(response)
}

export const arrowStyle = (isOpen: boolean) =>
  isOpen ? 'product-features__arrow arrow-opened' : 'product-features__arrow'

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
