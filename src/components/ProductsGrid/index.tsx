import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setCart } from '../../redux/slices/cartSlice'
import { Card } from '../Card'
import { IProduct } from '../share/types'
import s from './ProductGrid.module.css'
import { getOrCreateCart } from './utils'

interface Props {
  data: IProduct[]
}

export function ProductsGrid({ data }: Props) {
  const { cart } = useAppSelector((state) => state.carts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function getCurrentCart() {
      const cartState = await getOrCreateCart()
      dispatch(setCart(cartState))
    }
    getCurrentCart()
  }, [dispatch])

  return (
    <div className={s.productGrid}>
      {data.map((el) => (
        <Card
          key={el.id}
          item={el}
          cart={cart}
          setCart={(newCart) => {
            dispatch(setCart(newCart))
          }}
        />
      ))}
    </div>
  )
}
