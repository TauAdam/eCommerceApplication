import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { productsError, productsLoaded, productsRequested } from '../../redux/slices/productsSlice'
import { parseFetchedData } from '../../utils/products'
import { getProductsFromApi, getTotalProducts } from '../../utils/requests'
import Categories from '../Categories'
import { ProductsGrid } from '../ProductsGrid'
import s from './Catalog.module.css'
import { Pagination } from './Pagination'

function isLastPage(total: number, limit: number, currentPage: number) {
  if (limit * (currentPage + 1) < total) return false
  return true
}

export function Catalog() {
  const totalInitial = 13

  const { productsList, loading, errorMessage } = useAppSelector((state) => state.products)
  const [currentPage, setCurrentPage] = useState(0)
  const [lastPage, setLastPage] = useState(false)
  const [total, setTotal] = useState(13)
  const [limit, setLimit] = useState(10)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function gettingTotal(totalInitial: number, callback: (arg: number) => void) {
      const total = await getTotalProducts()
      if (total && total !== totalInitial) callback(total)
    }

    gettingTotal(totalInitial, setTotal)
  }, [])

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        dispatch(productsRequested())
        const fetchedProducts = await getProductsFromApi(limit, currentPage)
        if (isLastPage(total, limit, currentPage)) {
          setLastPage(true)
        } else {
          setLastPage(false)
        }
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
  }, [currentPage, total, limit, dispatch])

  if (errorMessage) {
    return <span>{errorMessage}</span>
  }
  return (
    <div className={s.catalog}>
      <Categories />
      {loading && <h1>Loading...</h1>}
      <ProductsGrid data={productsList} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={lastPage}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  )
}
