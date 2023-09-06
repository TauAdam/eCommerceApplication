import React, { useEffect, useState } from 'react'
import { Product, arrowStyle, getProduct, handleAttributes, handlePrice } from './helpFunctions'
import arrowImage from '../../../src/assets/images/arrow.png'
import './style.css'

interface DetailedProductProps {
  id: string
}

const initialProductState: Product = {
  name: 'Product name',
  image: 'Product image',
  description: 'Sample description',
  id: '',
  prices: undefined,
  attributes: undefined,
}

export function DetailedProduct(props: DetailedProductProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const [product, setProduct] = useState(initialProductState as Product)
  const [openFeatures, setOpenFeatures] = useState(false)

  useEffect(() => {
    getProduct(props.id, setProduct)
  }, [props.id])

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
      <h2>{product.name}</h2>
      <div className="detailed-pruduct__image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        <p className="product-price">$&nbsp;{handlePrice(product.prices)}</p>
      </div>
      <div className="detailed-product__features-wrapper">
        <div className="product-features">
          <button
            onClick={() => {
              setOpenFeatures(!openFeatures)
            }}
          >
            Features and description
            <img src={arrowImage} alt="arrow" className={arrowStyle(openFeatures)} />
          </button>
          {openFeatures && (
            <>
              <ul>{handleAttributes(product.attributes)}</ul>
              <p className="product-description">{product.description}</p>
            </>
          )}
        </div>
      </div>
      <div className="detailed-product__button-wrapper">
        <button onClick={handleAddToCart} disabled={isInCart}>
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </button>
        <button onClick={handleToggleFavorite}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  )
}
