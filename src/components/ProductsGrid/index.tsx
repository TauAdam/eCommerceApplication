import React from 'react'
import { Card } from '../Card'
import { IProduct } from '../share/types'
import s from './ProductGrid.module.css'

interface ProductsGridProps {
  data: IProduct[]
}

export function ProductsGrid({ data }: ProductsGridProps) {
  return (
    <div className={s.productGrid}>
      {data.map((el) => (
        <Card key={el.id} item={el} />
      ))}
    </div>
  )
}
