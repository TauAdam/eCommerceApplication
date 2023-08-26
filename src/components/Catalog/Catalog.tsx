import React, { useEffect, useState } from 'react'
import { parseFetchedData } from '../../utils/products'
import { getProductsFromApi } from '../../utils/requests'
import { ProductsGrid } from '../ProductsGrid'
import { IProduct } from '../share/types'
import s from './Catalog.module.css'

async function getProducts() {
  const fetchedProducts = await getProductsFromApi()
  const products = parseFetchedData(fetchedProducts)
  return products
}

export default function Catalog() {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    async function fetchProductDetails() {
      const productDetails = await getProducts()
      setProducts(productDetails)
    }

    fetchProductDetails()
  }, [])

  return (
    <div className={s.catalog}>
      <ProductsGrid data={products} />
    </div>
  )
}
