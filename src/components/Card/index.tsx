import React from 'react'
import { IProduct } from '../share/types'
import s from './Card.module.css'

interface Props {
  item: IProduct
}

export function Card({ item }: Props) {
  const { prices } = item
  let discountedPrice
  let originalPrice

  if (prices) {
    const priceVariant = prices[Math.floor(Math.random() * prices.length)]

    if (priceVariant) {
      const { value, discounted } = priceVariant
      const { centAmount, fractionDigits, currencyCode } = value

      originalPrice = `${centAmount / 10 ** fractionDigits} ${currencyCode}`

      if (discounted) {
        const { centAmount: discCentAmount, fractionDigits: discFractionDigits } = discounted.value
        discountedPrice = `${discCentAmount / 10 ** discFractionDigits} ${
          discounted.value.currencyCode
        }`
      }
    }
  }
  return (
    <div className={s.card}>
      <div className={s.imgContainer}>
        <img className={s.cardImage} src={item.image} alt={item.name} />
      </div>
      <div className={s.cardContent}>
        <div className={s.cardTitle}>{item.name}</div>
        {discountedPrice && originalPrice ? (
          <div className={s.cardPrice}>
            <span className={s.priceDiscounted}>{discountedPrice}</span>
            <span className={s.priceOriginal}>{originalPrice}</span>
          </div>
        ) : (
          originalPrice && (
            <div className={s.cardPrice}>
              <span className={s.priceSimple}>{originalPrice}</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}
