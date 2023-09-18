import React, { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { getOrCreateCart } from '../../components/ProductsGrid/utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setCart } from '../../redux/slices/cartSlice'
import { getFormattedPrice } from '../../utils/prices'

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

  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        <p>
          Total:
          {getFormattedPrice(centAmount, fractionDigits, currencyCode)}
        </p>
        <Footer />
      </div>
    </div>
  )
}
