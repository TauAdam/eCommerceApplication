import React from 'react'
import './style.css'

export const DiscountCodes = () => {
  return (
    <div className="discounts-wrapper">
      <h3 className="discounts-header">Наши новые промокоды:</h3>
      <ul className="discounts-list">
        <li>
          <span className="discounts-list__code">discount10</span>
          <span className="discounts-list__description">
            {' - получите скидку 10% на все товары!'}
          </span>
        </li>
      </ul>
    </div>
  )
}
