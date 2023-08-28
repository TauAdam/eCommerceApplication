import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProductsList } from '../../redux/slices/productsSlice'
import { RootState } from '../../redux/store/store'
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
  const { productsList } = useSelector((state: RootState) => state.products)

  const dispatch = useDispatch()
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
