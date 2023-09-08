import React, { useState } from 'react'
import { addToCart, removeFromCart, updateQuantity } from 'utils/requests'
import { getOrCreateCart } from './utils'
import { Cart } from '@commercetools/platform-sdk'
import cartImage from '../../../src/assets/images/cart.svg'
import s from './Card.module.css'

interface Props {
  cartVersion: number
  setCartVersion: (arg: number) => void
  productId: string
  centAmount: number
  sku: string
}

const cartState = await getOrCreateCart()

const getLineItemId = async (cart: Cart, productID: string) => {
  return cart.lineItems.filter((item) => item.productId === productID)[0].id || ''
}

export function AddtoCart({ cartVersion, setCartVersion, centAmount, sku, productId }: Props) {
  const [amount, setAmount] = useState(0)
  const [cart, setCart] = useState(cartState)
  const [lineItemId, setLineItemId] = useState('')
  const [outOfStock, setOutOfStock] = useState(false)

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
                    const newCart = await removeFromCart(cart.id, cartVersion, lineItemId)
                    setCart(newCart)
                    setCartVersion(newCart.version)
                  } else {
                    const newCart = await updateQuantity(
                      cart.id,
                      cartVersion,
                      lineItemId,
                      newAmount,
                      centAmount
                    )
                    setCart(newCart)
                    setCartVersion(newCart.version)
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
                  const newCart = await updateQuantity(
                    cart.id,
                    cartVersion,
                    lineItemId,
                    newAmount,
                    centAmount
                  )
                  setCart(newCart)
                  setCartVersion(newCart.version)
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
                  const newCart = await addToCart(cart.id, cartVersion, sku, 1, centAmount)
                  setAmount(1)
                  setCart(newCart)
                  setCartVersion(newCart.version)
                  if (lineItemId === '') setLineItemId(await getLineItemId(newCart, productId))
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
