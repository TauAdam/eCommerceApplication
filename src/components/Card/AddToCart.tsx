import React, { useState, useEffect, useRef } from 'react'
import { addToCart, removeFromCart, updateQuantity } from 'utils/cart'
import { Cart } from '@commercetools/platform-sdk'
import cartImage from '../../../src/assets/images/cart.svg'
import s from './Card.module.css'
import { getLineItemId, setInitialAmount } from 'components/share/handleCart'

type SetState<T> = (arg: T) => void
interface Props {
  cart: Cart
  setCart: SetState<Cart>
  productId: string
  centAmount: number
  sku: string
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

export function AddtoCart({ cart, setCart, sku, productId }: Props) {
  const initialAmount = setInitialAmount(cart, productId)
  const [amount, setAmount] = useState(initialAmount)
  const [outOfStock, setOutOfStock] = useState(false)
  const [showInput, setShowInput] = useState(false)

  const manualQuantity = useRef(null)

  useEffect(() => {
    setAmount(initialAmount)
  }, [initialAmount])

  const lineItemId = getLineItemId(cart, productId)

  return (
    <div className={s.card__addToCart}>
      {!outOfStock && (
        <>
          {!showInput && amount > 0 && (
            <>
              <button
                className={s.card__addRemoveButton}
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
              >
                -
              </button>
              <span className={s.card__amount}>{amount}</span>
              <button
                className={s.card__addRemoveButton}
                onClick={async (event) => {
                  event.stopPropagation()
                  const newAmount = amount + 1
                  updateAmount(cart, lineItemId, newAmount, setCart, setAmount)
                }}
              >
                +
              </button>
            </>
          )}
          {!showInput && amount === 0 && (
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
          <div className={s.manualQuantity}>
            {!showInput && (
              <span
                className={s.PointerBold}
                onClick={() => {
                  setShowInput(true)
                }}
              >
                set quantity manualy
              </span>
            )}
            {showInput && (
              <>
                <span>Select quantity:</span>
                <input type="number" defaultValue={amount} ref={manualQuantity} />
                <span
                  className={s.PointerBold}
                  onClick={async () => {
                    const input = manualQuantity.current as unknown as HTMLInputElement
                    if (input) {
                      const newAmount = Number(input.value)
                      if (amount < 0) return
                      updateAmount(cart, lineItemId, newAmount, setCart, setAmount)
                      setShowInput(false)
                    }
                  }}
                >
                  Ok
                </span>
              </>
            )}
          </div>
        </>
      )}
      {outOfStock && <h3>Sorry, this product is out of stock</h3>}
    </div>
  )
}
