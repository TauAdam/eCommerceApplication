import React from 'react'
import { Catalog } from '../../components/Catalog'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

export function CatalogPage() {
  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        <Catalog />
        <Footer />
      </div>
    </div>
  )
}
