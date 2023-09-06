import React, { useState } from 'react'
import s from './ProductFilter.module.css'

interface Props {
  onFilterChange: (filterValue: string) => void
}

export function ProductFilter({ onFilterChange }: Props) {
  const [filterValue, setFilterValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFilterValue(value)
    onFilterChange(value)
  }

  return (
    <div className={s.wrapper}>
      <input
        type="text"
        placeholder="Введите название"
        value={filterValue}
        onChange={handleInputChange}
      />
    </div>
  )
}
