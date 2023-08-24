import Header from 'components/Header/Header'
import Promo from 'components/Promo/Promo'
import Catalog from 'components/Catalog/Catalog'
import Footer from 'components/Footer/Footer'

import React from 'react'

export default function Home() {
  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        <Promo />
        <Catalog />
        <Footer />
      </div>
    </div>
  )
}
