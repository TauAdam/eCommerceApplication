import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { productsError, productsLoaded, productsRequested } from '../../redux/slices/productsSlice'
import { parseFetchedData } from '../../utils/products'
import { getProductsFromApi } from '../../utils/requests'
import Categories from '../Categories'
import { ProductsGrid } from '../ProductsGrid'
import s from './Catalog.module.css'
import { ProductFilter } from 'components/ProductFilter/ProductFilter'
import { IProduct } from 'components/share/types'

export function Catalog() {
  const { productsList, loading, errorMessage } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        dispatch(productsRequested())
        const fetchedProducts = await getProductsFromApi()
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

  if (errorMessage) {
    return <span>{errorMessage}</span>
  }
  return (
    <div className={s.catalog}>
      <Categories />
      <ProductFilter onFilterChange={handleFilterChange} />
      {loading && <h1>Loading...</h1>}
      <ProductsGrid data={filteredProducts} />
    </div>
  )
}
