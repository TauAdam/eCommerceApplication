import Header from 'components/Header/Header'
import LogIn from 'components/LogIn/LogIn'
import Footer from 'components/Footer/Footer'

import React from 'react'

export default function Enter() {
  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        <LogIn />
        <Footer />
      </div>
    </div>
  )
}
