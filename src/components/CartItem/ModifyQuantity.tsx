import { Cart } from '@commercetools/platform-sdk'
import React, { useState } from 'react'
import { removeFromCart, updateQuantity } from 'utils/cart'
import s from './CartItem.module.css'

type SetState<T> = (arg: T) => void
interface Props {
  cart: Cart
  setCart: SetState<Cart>
  lineItemId: string
  initialQuantity: number
}

const updateAmount = async (
  cart: Cart,
  lineItemId: string,
  newAmount: number,
  cartCallback: SetState<Cart>,
  amountCallback: SetState<number>
) => {
  const newCart = await updateQuantity(cart.id, cart.version, lineItemId, newAmount)
  cartCallback(newCart)
  amountCallback(newAmount)
}

export function ModifyQuantity({ lineItemId, cart, setCart, initialQuantity }: Props) {
  const [amount, setAmount] = useState(initialQuantity)

  return (
    <div className={s.quantityBlock}>
      <img
        src="/-.png"
        alt="-"
        className={s.addRemoveBtn}
        onClick={async (event) => {
          event.stopPropagation()
          const newAmount = amount - 1
          if (newAmount === 0) {
            const newCart = await removeFromCart(cart.id, cart.version, lineItemId)
            setCart(newCart)
            setAmount(newAmount)
          } else {
            updateAmount(cart, lineItemId, newAmount, setCart, setAmount)
          }
        }}
      />

      <span className={s.amount}>{amount}</span>
      <img
        src="/+.png"
        alt="+"
        className={s.addRemoveBtn}
        onClick={async (event) => {
          event.stopPropagation()
          const newAmount = amount + 1
          updateAmount(cart, lineItemId, newAmount, setCart, setAmount)
        }}
      />
    </div>
  )
}
