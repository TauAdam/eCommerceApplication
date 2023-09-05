import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import { fetchProductDetails } from '../../utils/requests'

import { Product } from '@commercetools/platform-sdk'
import { DetailedProduct } from '../../components/DetailedProduct'

export function DetailedProductPage() {
  const { productId } = useParams()

  const [productData, setProductData] = useState<Product>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function getProductById(id: string) {
    try {
      setLoading(true)
      const product = await fetchProductDetails(id)
      console.log(product)
      setProductData(product)
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (typeof productId === 'string') {
      getProductById(productId)
    }
  }, [productId])

  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {productData && <DetailedProduct product={productData} />}
        <Footer />
      </div>
    </div>
  )
}
