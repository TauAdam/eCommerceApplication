import { ProductPagedQueryResponse } from '@commercetools/platform-sdk'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { productsError, productsLoaded, productsRequested } from '../../redux/slices/productsSlice'
import { parseFetchedData } from '../../utils/products'
import { getProductsFromApi } from '../../utils/requests'
import { ProductsGrid } from '../ProductsGrid'
import s from './Catalog.module.css'
import { ProductFilter } from 'components/ProductFilter'
import { IProduct } from 'components/share/types'

export function Catalog() {
  const { productsList, loading, errorMessage } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]) // Изменено начальное значение

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        dispatch(productsRequested())
        const fetchedProducts: ProductPagedQueryResponse = await getProductsFromApi()
        const productDetails = parseFetchedData(fetchedProducts)
        dispatch(productsLoaded(productDetails))

        setFilteredProducts(productDetails)
      } catch (error) {
        if (error instanceof Error) {
          dispatch(productsError(error.message))
          console.log(error)
        }
      }
    }

    fetchProductDetails()
  }, [dispatch])

  const handleFilterChange = (filterValue: string) => {
    if (filterValue.trim() === '') {
      setFilteredProducts(productsList)
    } else {
      const filtered = productsList.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      )
      setFilteredProducts(filtered)
    }
  }

  console.log('Products List:', productsList)

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (errorMessage) {
    return <span>{errorMessage}</span>
  }
  return (
    <div className={s.catalog}>
      <ProductFilter onFilterChange={handleFilterChange} />
      <ProductsGrid data={filteredProducts} />
    </div>
  )
}
