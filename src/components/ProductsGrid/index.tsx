import React, { useState } from 'react'
import { Card } from '../Card'
import { IProduct } from '../share/types'
import { getOrCreateCart } from './utils'
import s from './ProductGrid.module.css'

interface Props {
  data: IProduct[]
}

const cartInitialState = await getOrCreateCart()

export function ProductsGrid({ data }: Props) {
  const [cart, setCart] = useState(cartInitialState)
  return (
    <div className={s.productGrid}>
      {data.map((el) => (
        <Card key={el.id} item={el} cart={cart} setCart={setCart} />
      ))}
    </div>
  )
}
