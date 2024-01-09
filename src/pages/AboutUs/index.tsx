import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { AboutUs } from 'components/AboutUs'

export function AboutUsPage() {
  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        <AboutUs />
        <Footer />
      </div>
    </div>
  )
}
