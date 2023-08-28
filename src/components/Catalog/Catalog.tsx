import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setProductsList } from '../../redux/slices/productsSlice'
import { parseFetchedData } from '../../utils/products'
import { getProductsFromApi } from '../../utils/requests'
import { ProductsGrid } from '../ProductsGrid'
import s from './Catalog.module.css'

async function getProducts() {
  const fetchedProducts = await getProductsFromApi()
  const products = parseFetchedData(fetchedProducts)
  return products
}

export default function Catalog() {
  const { productsList } = useAppSelector((state) => state.products)

  const dispatch = useAppDispatch()
  useEffect(() => {
    async function fetchProductDetails() {
      const productDetails = await getProducts()
      dispatch(setProductsList(productDetails))
    }

    fetchProductDetails()
  }, [dispatch])

  return (
    <div className={s.catalog}>
      <ProductsGrid data={productsList} />
    </div>
  )
}
