import React from 'react'
import { useParams } from 'react-router-dom'

import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'

// import { DetailedProduct } from '../../components/DetailedProduct'

// const mockData = {
//   name: 'Wireless Headphones',
//   price: 99.99,
//   image: 'link_to_headphone_image.jpg',
//   description: 'High-quality wireless headphones with noise cancellation.',
//   features: [
//     'Bluetooth connectivity',
//     'Active noise cancellation',
//     'Up to 20 hours of battery life',
//     'Comfortable over-ear design',
//   ],
// }
export function DetailedProductPage() {
  const { productId } = useParams()

  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        <h1>detailed product page - {productId}</h1>
        {/* <DetailedProduct product={mockData} /> */}
        <Footer />
      </div>
    </div>
  )
}
