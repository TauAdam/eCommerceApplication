import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { productsError, productsLoaded, productsRequested } from '../../redux/slices/productsSlice'
import { parseFetchedData } from '../../utils/products'
import { getProductsFromApi } from '../../utils/requests'
import { ProductsGrid } from '../ProductsGrid'
import s from './Catalog.module.css'

export default function Catalog() {
  const { productsList, loading, errorMessage } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        dispatch(productsRequested())
        const fetchedProducts = await getProductsFromApi()
        const productDetails = parseFetchedData(fetchedProducts)
        dispatch(productsLoaded(productDetails))
      } catch (error) {
        if (error instanceof Error) {
          dispatch(productsError(error.message))
          console.log(error)
        }
      }
    }

    fetchProductDetails()
  }, [dispatch])

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (errorMessage) {
    return <span>{errorMessage}</span>
  }
  return (
    <div className={s.catalog}>
      <ProductsGrid data={productsList} />
    </div>
  )
}
