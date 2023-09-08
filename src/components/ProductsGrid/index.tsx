import React, { useState } from 'react'
import { Card } from '../Card'
import { IProduct } from '../share/types'
import s from './ProductGrid.module.css'
import { getOrCreateCart } from 'components/Card/utils'

interface Props {
  data: IProduct[]
}

const cartInitialVersion = (await getOrCreateCart()).version

export function ProductsGrid({ data }: Props) {
  const [cartVersion, setCartVersion] = useState(cartInitialVersion)
  return (
    <div className={s.productGrid}>
      {data.map((el) => (
        <Card key={el.id} item={el} cartVersion={cartVersion} setCartVersion={setCartVersion} />
      ))}
    </div>
  )
}
