import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { productsError, productsLoaded, productsRequested } from '../../redux/slices/productsSlice'
import { parseFetchedData } from '../../utils/products'
import { getProductsFromApi } from '../../utils/requests'
import Categories from '../Categories'
import { ProductsGrid } from '../ProductsGrid'
import s from './Catalog.module.css'

export function Catalog() {
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

  if (errorMessage) {
    return <span>{errorMessage}</span>
  }
  return (
    <div className={s.catalog}>
      <Categories />
      {loading && <h1>Loading...</h1>}
      <ProductsGrid data={productsList} />
    </div>
  )
}
