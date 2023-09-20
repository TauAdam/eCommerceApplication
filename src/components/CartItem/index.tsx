import { LineItem, Price } from '@commercetools/platform-sdk'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setCart } from '../../redux/slices/cartSlice'
import { getPrices } from '../../utils/prices'
import s from './CartItem.module.css'
import { ModifyQuantity } from './ModifyQuantity'

interface Props {
  item: LineItem
}

export function CartItem({ item }: Props) {
  const { cart } = useAppSelector((state) => state.carts)
  const dispatch = useAppDispatch()

  return (
    <div key={item.id} className={s.item}>
      <div className={s.row}>
        <img src={item.variant.images?.[0].url} alt={item.name['en-US']} className={s.img} />
        <div className={s.textBlock}>
          <div className={s.name}>{item.name['en-US']}</div>
          {renderPrice(item.price)}
        </div>
        <img src="/bin.png" alt="delete" className={s.deleteIcon} />
      </div>
      <div className={s.row}>
        <ModifyQuantity
          lineItemId={item.id}
          cart={cart}
          initialQuantity={item.quantity}
          setCart={(newCart) => {
            dispatch(setCart(newCart))
          }}
        />
        <div className={s.cost}>Cost: {countTotalCost(item.price, item.quantity)}</div>
      </div>
    </div>
  )
}

function renderPrice(priceObject: Price) {
  const { discountedPrice, originalPrice } = getPrices(priceObject)

  return (
    <div className="prices-block">
      {discountedPrice ? (
        <>
          <span className="price-discounted">{discountedPrice}</span>
          <span className="price-original">{originalPrice}</span>
        </>
      ) : (
        <span className="product-price">{originalPrice}</span>
      )}
    </div>
  )
}
function countTotalCost(priceObject: Price, quantity: number) {
  const { discountedPrice, originalPrice } = getPrices(priceObject, quantity)
  return discountedPrice ? discountedPrice : originalPrice
}
