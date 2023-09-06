import React from 'react'
import { useParams } from 'react-router-dom'

import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import { DetailedProduct } from 'components/DetailedProduct'

export function DetailedProductPage() {
  const { productId } = useParams()

  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        {productId && <DetailedProduct {...{ id: productId }} />}
        {!productId && (
          <h2>
            Product with id
            <br />
            {productId}
            <br />
            not found
          </h2>
        )}
        <Footer />
      </div>
    </div>
  )
}
