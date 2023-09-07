import React from 'react'
import { Link } from 'react-router-dom'
import { transformPrices } from '../../utils/products'
import { IProduct } from '../share/types'
import s from './Card.module.css'

interface Props {
  item: IProduct
}

export function Card({ item }: Props) {
  const { prices, name, id, images, description } = item
  const { originalPrice, discountedPrice } = transformPrices(prices)

  return (
    <Link to={`/catalog/${id}`}>
      <div className={s.card}>
        <div className={s.imgContainer}>
          <img className={s.image} src={images[0]} alt={name} />
        </div>
        <div className={s.cardContent}>
          <div className={s.row}>
            <div className={s.name}>{name}</div>
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
          <div className={s.description}>{description}</div>
        </div>
      </div>
    </Link>
  )
}
