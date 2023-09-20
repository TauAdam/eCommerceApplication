import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { removeMyCart } from 'utils/cart'
import { getOrCreateCart } from '../../components/ProductsGrid/utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { deleteCart, setCart } from '../../redux/slices/cartSlice'
import { getFormattedPrice } from '../../utils/prices'
import { getCartDiscount, setCartDiscountActive } from 'utils/discount'
import { CartItem } from '../../components/CartItem'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './CartPage.css'

export function CartPage() {
  const { cart } = useAppSelector((state) => state.carts)
  const [promo, setPromo] = useState('')
  const [usedPromo, setUsedPromo] = useState([] as string[])
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function getCurrentCart() {
      const cartState = await getOrCreateCart()
      dispatch(setCart(cartState))
    }
    getCurrentCart()
  }, [dispatch, usedPromo])

  useEffect(() => {
    async function removePromocode() {
      const cartDiscount = await getCartDiscount('discount10')
      if (cartDiscount.isActive) setCartDiscountActive(false, 'discount10')
    }

    removePromocode()
  }, [])

  const { centAmount, fractionDigits, currencyCode } = cart.totalPrice
  const { lineItems } = cart

  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        {lineItems.length ? (
          <>
            <div className="line-items">
              {lineItems.map((el) => (
                <CartItem key={el.id} item={el} />
              ))}
            </div>
            <div className="total-price">
              Total Price:
              {getFormattedPrice(centAmount, fractionDigits, currencyCode)}
            </div>
            <p
              className="empty-cart__link"
              onClick={() => {
                removeMyCart(cart.version)
                dispatch(deleteCart())
              }}
            >
              Clear
            </p>
          </>
        ) : (
          <div className="empty-cart">
            <img src="/empty-cart.png" alt="empty cart" className="empty-cart__image" />
            <div>
              <div className="empty-cart__text">Cart is empty</div>
              <div className="empty-cart__text_desc">
                {'But it&apos;s never too late to fix it :)'}
              </div>
            </div>
            <Link to={'/catalog'} className="empty-cart__link">
              Start shopping now
            </Link>
          </div>
        )}
        <div className="discounts-summary">
          <h4 className="discounts-header">Used promocodes: {usedPromo.length === 0 && 'no'}</h4>
          <ul className="promocode-summary">
            {usedPromo.map((promo) => {
              return (
                <li key={promo}>
                  <span className="used-promocode">{promo}</span>
                  <span
                    className="clear-promocode"
                    onClick={async () => {
                      await setCartDiscountActive(false, promo)
                      setUsedPromo(usedPromo.filter((code) => code !== promo))
                    }}
                  >
                    delete
                  </span>
                </li>
              )
            })}
          </ul>
          <h5 className="discounts-warn">
            {
              'Чтобы увидеть обновленную цену, измените количество какого-либо товара в Вашей корзине :)'
            }
          </h5>
        </div>
        <input
          className="discounts-input"
          type="text"
          placeholder="use promocode"
          onChange={(event) => {
            setPromo(event.target.value)
          }}
        ></input>
        <button
          className="promocode-accept"
          onClick={async () => {
            const cartDiscount = await setCartDiscountActive(true, promo)
            if (cartDiscount && usedPromo.indexOf(promo) === -1) setUsedPromo([...usedPromo, promo])
          }}
        >
          Accept promocode
        </button>
        <Footer />
      </div>
    </div>
  )
}
