import { AddtoCart } from 'components/Card/AddToCart'
import { getOrCreateCart } from 'components/ProductsGrid/utils'
import { Slider } from 'components/Slider'
import { handlePrice } from 'components/share/handleCart'
import React, { useEffect, useState } from 'react'
import arrowImage from '../../../src/assets/images/arrow.png'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setCart } from '../../redux/slices/cartSlice'
import { transformPrices } from '../../utils/prices'
import { IProduct } from '../share/types'
import { arrowStyle, getProduct, handleAttributes } from './helpFunctions'
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
  const { cart } = useAppSelector((state) => state.carts)
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState<IProduct>(initialProductState)
  const [openFeatures, setOpenFeatures] = useState(false)

  const { originalPrice, discountedPrice } = transformPrices(product.prices)

  useEffect(() => {
    getProduct(props.id, setProduct)
  }, [props.id])

  useEffect(() => {
    async function getCurrentCart() {
      const cartState = await getOrCreateCart()
      dispatch(setCart(cartState))
    }
    getCurrentCart()
  }, [dispatch])

  function handleToggleFavorite() {
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
      <AddtoCart
        cart={cart}
        setCart={(newCart) => {
          dispatch(setCart(newCart))
        }}
        productId={product.id}
        centAmount={handlePrice(originalPrice, discountedPrice)}
        sku={product.sku || ''}
      />
      <div className="detailed-product__button-wrapper">
        <button onClick={handleToggleFavorite}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  )
}
