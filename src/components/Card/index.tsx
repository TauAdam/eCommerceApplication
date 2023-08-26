import React from 'react'
import { IProduct } from '../share/types'
import s from './Card.module.css'

interface CardProps {
  item: IProduct
}

export function Card({ item }: CardProps) {
  return (
    <div className={s.card}>
      <img className={s.cardImage} src={item.image} alt={item.name} />
      <div className={s.cardContent}>
        <h3 className={s.cardTitle}>{item.name}</h3>
      </div>
    </div>
  )
}
