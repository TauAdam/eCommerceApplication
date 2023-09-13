import React, { useEffect, useState } from 'react'
import { Card } from '../Card'
import { IProduct } from '../share/types'
import { cartInitialState } from 'components/share/handleCart'
import { getOrCreateCart } from './utils'
import s from './ProductGrid.module.css'

interface Props {
  data: IProduct[]
}

export function ProductsGrid({ data }: Props) {
  const [cart, setCart] = useState(cartInitialState)

  useEffect(() => {
    async function getCurrentCart() {
      const cartState = await getOrCreateCart()
      setCart(cartState)
    }
    getCurrentCart()
  }, [])

  return (
    <div className={s.productGrid}>
      {data.map((el) => (
        <Card key={el.id} item={el} cart={cart} setCart={setCart} />
      ))}
    </div>
  )
}
