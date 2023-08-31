import React from 'react'
import { Card } from '../Card'
import { IProduct } from '../share/types'
import s from './ProductGrid.module.css'

interface Props {
  data: IProduct[]
}

export function ProductsGrid({ data }: Props) {
  return (
    <div className={s.productGrid}>
      {data.map((el) => (
        <Card key={el.id} item={el} />
      ))}
    </div>
  )
}
