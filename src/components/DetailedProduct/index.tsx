import { Product } from '@commercetools/platform-sdk'
import React from 'react'
import s from './DetailedProduct.module.css'

interface Props {
  product: Product
}

export function DetailedProduct({ product }: Props) {
  const name = product.masterData.current.name['en-US']
  const description = product.masterData.current.description?.['en-US']
  const { images } = product.masterData.current.masterVariant

  return (
    <div className={s.detailedProduct}>
      <div className={s.body}>
        <div className={s.imagesContainer}>
          {images?.map((image) => (
            <img key={image.url} src={image.url} alt={name} className={s.image} />
          ))}
        </div>
        <div className={s.name}>{name}</div>
      </div>
      <p className={s.description}>{description}</p>
    </div>
  )
}
