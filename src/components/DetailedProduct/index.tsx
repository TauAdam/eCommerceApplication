import React, { useState } from 'react'
import './style.css'

interface Product {
  name: string
  price: number
  image: string
  description: string
  features: string[]
}

interface DetailedProductProps {
  product: Product
}

export function DetailedProduct({ product }: DetailedProductProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInCart, setIsInCart] = useState(false)

  function handleAddToCart() {
    // Добавить логику для добавления товара в корзину
    setIsInCart(true)
  }

  function handleToggleFavorite() {
    // Добавить логику для добавления/удаления товара из избранного
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="detailed-product">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
      <div className="product-features">
        <h3>Features:</h3>
        <ul>
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleAddToCart} disabled={isInCart}>
        {isInCart ? 'In Cart' : 'Add to Cart'}
      </button>
      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  )
}
