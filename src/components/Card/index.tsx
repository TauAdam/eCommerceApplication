import React from 'react'
import { Link } from 'react-router-dom'
import { transformPrices } from '../../utils/products'
import { IProduct } from '../share/types'
import { AddtoCart } from './AddToCart'
import s from './Card.module.css'

interface Props {
  item: IProduct
  cartVersion: number
  setCartVersion: (arg: number) => void
}

const handlePrice = (original: string | undefined, discounted: string | undefined) => {
  if (discounted) return Number(discounted.slice(1).split('.').join(''))
  if (original) return Number(original.slice(1).split('.').join(''))
  return 0
}

export function Card({ item, cartVersion, setCartVersion }: Props) {
  const { prices, name, id, images, description } = item
  const { originalPrice, discountedPrice } = transformPrices(prices)

  return (
    <>
      <div className={s.card}>
        <Link to={`/catalog/${id}`}>
          <div className={s.imgContainer}>
            <img className={s.image} src={images[0]} alt={name} />
          </div>
        </Link>
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
          <AddtoCart
            {...{
              cartVersion,
              setCartVersion,
              productId: item.id,
              centAmount: handlePrice(originalPrice, discountedPrice),
              sku: item.sku || '',
            }}
          />
        </div>
      </div>
    </>
  )
}
