import { Price } from '@commercetools/platform-sdk'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { getOrCreateCart } from '../../components/ProductsGrid/utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setCart } from '../../redux/slices/cartSlice'
import { getFormattedPrice, getPrices } from '../../utils/prices'
import './CartPage.css'
import { removeMyCart } from 'utils/cart'

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
          <p className="product-price">{originalPrice}</p>
        )}
      </div>
    )
  }
  function countTotalCost(priceObject: Price, quantity: number) {
    const { discountedPrice, originalPrice } = getPrices(priceObject, quantity)
    return discountedPrice ? discountedPrice : originalPrice
  }
  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        {lineItems.length ? (
          <>
            <ul>
              {lineItems.map((el) => (
                <li key={el.id} className="cart-item">
                  <img src={el.variant.images?.[0].url} alt={el.name['en-US']} />
                  <p>{el.name['en-US']}</p>
                  {renderPrice(el.price)}
                  <p>Total Cost: {countTotalCost(el.price, el.quantity)}</p>
                </li>
              ))}
            </ul>
            <p>
              Total Price:
              {getFormattedPrice(centAmount, fractionDigits, currencyCode)}
            </p>
            <p
              className="empty-cart__link"
              onClick={() => {
                removeMyCart(cart.version)
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
