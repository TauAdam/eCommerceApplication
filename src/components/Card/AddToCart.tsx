import React, { useState } from 'react'
import { addToCart, removeFromCart, updateQuantity } from 'utils/cart'
import { Cart } from '@commercetools/platform-sdk'
import cartImage from '../../../src/assets/images/cart.svg'
import s from './Card.module.css'

interface Props {
  cart: Cart
  setCart: (arg: Cart) => void
  productId: string
  centAmount: number
  sku: string
}

const getLineItemId = (cart: Cart, productID: string) => {
  const lineItem = cart.lineItems.find((item) => item.productId === productID)
  return lineItem?.id || ''
}

const setInitialAmount = (cart: Cart, productID: string) => {
  const lineItem = cart.lineItems.find((item) => item.productId === productID)
  return lineItem?.quantity || 0
}

export function AddtoCart({ cart, setCart, sku, productId }: Props) {
  const [amount, setAmount] = useState(setInitialAmount(cart, productId))
  const [outOfStock, setOutOfStock] = useState(false)

  const lineItemId = getLineItemId(cart, productId)

  return (
    <div className={s.card__addToCart}>
      {!outOfStock && (
        <>
          {amount > 0 && (
            <>
              <button
                className={s.card__addRemoveButton}
                onClick={async (event) => {
                  event.stopPropagation()
                  const newAmount = amount - 1
                  if (newAmount === 0) {
                    const newCart = await removeFromCart(cart.id, cart.version, lineItemId)
                    setCart(newCart)
                  } else {
                    const newCart = await updateQuantity(
                      cart.id,
                      cart.version,
                      lineItemId,
                      newAmount
                    )
                    setCart(newCart)
                  }
                  setAmount(newAmount)
                }}
              >
                -
              </button>
              <span className={s.card__amount}>{amount}</span>
              <button
                className={s.card__addRemoveButton}
                onClick={async (event) => {
                  event.stopPropagation()
                  const newAmount = amount + 1
                  const newCart = await updateQuantity(cart.id, cart.version, lineItemId, newAmount)
                  setCart(newCart)
                  setAmount(newAmount)
                }}
              >
                +
              </button>
            </>
          )}
          {amount === 0 && (
            <img
              className={s.cartImage}
              src={cartImage}
              alt="add to cart"
              onClick={async (event) => {
                if (sku === '') return
                event.stopPropagation()
                try {
                  const newCart = await addToCart(cart.id, cart.version, sku, 1)
                  setAmount(1)
                  setCart(newCart)
                } catch (e) {
                  console.log(e)
                  if (e instanceof Error && e.message === 'out of stock') {
                    setOutOfStock(true)
                  }
                }
              }}
            />
          )}
        </>
      )}
      {outOfStock && <h3>Sorry, this product is out of stock</h3>}
    </div>
  )
}
