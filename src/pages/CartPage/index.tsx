import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { removeMyCart } from 'utils/cart'
import { CartItem } from '../../components/CartItem'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { getOrCreateCart } from '../../components/ProductsGrid/utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { deleteCart, setCart } from '../../redux/slices/cartSlice'
import { getFormattedPrice } from '../../utils/prices'
import './CartPage.css'

export function CartPage() {
  const { cart } = useAppSelector((state) => state.carts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function getCurrentCart() {
      const cartState = await getOrCreateCart()
      dispatch(setCart(cartState))
    }
    getCurrentCart()
  }, [dispatch])

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
              <div className="empty-cart__text_desc">But it&apos;s never too late to fix it :)</div>
            </div>
            <Link to={'/catalog'} className="empty-cart__link">
              Start shopping now
            </Link>
          </div>
        )}
        <Footer />
      </div>
    </div>
  )
}
