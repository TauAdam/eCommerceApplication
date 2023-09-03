import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import Promo from 'components/Promo/Promo'

import React from 'react'

export default function Home() {
  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        <Promo />
        <Footer />
      </div>
    </div>
  )
}
