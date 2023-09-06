import React, { useEffect, useState } from 'react'
import { transformPrices } from '../../utils/products'
import { IProduct } from '../share/types'
import { arrowStyle, getProduct, handleAttributes } from './helpFunctions'
import arrowImage from '../../../src/assets/images/arrow.png'
import { Slider } from 'components/Slider'
import './style.css'

interface DetailedProductProps {
  id: string
}

const initialProductState: IProduct = {
  name: 'Product name',
  images: ['Product image'],
  description: 'Sample description',
  id: '',
  prices: undefined,
  attributes: undefined,
}

export function DetailedProduct(props: DetailedProductProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const [product, setProduct] = useState<IProduct>(initialProductState)
  const [openFeatures, setOpenFeatures] = useState(false)

  const { originalPrice, discountedPrice } = transformPrices(product.prices)

  useEffect(() => {
    getProduct(props.id, setProduct)
  }, [props.id])

  // useEffect(() => {
  //   addProductImage('30a61993-fdda-4b60-9127-8c4a9785bd1a', necklaceImg, 400, 400, 1, 4)
  // }, [props.id])

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
        <Slider {...{ images: product.images, name: product.name }} />
        <div className="product-main">
          {discountedPrice && originalPrice ? (
            <div className="prices-block">
              <span className="price-discounted">{discountedPrice}</span>
              <span className="price-original">{originalPrice}</span>
            </div>
          ) : (
            originalPrice && (
              <div className="prices-block">
                <p className="product-price">{originalPrice}</p>
              </div>
            )
          )}
        </div>
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
