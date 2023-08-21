import Header from 'components/Header/Header'
import SignUp from 'components/SignUp/SignUp'
import Footer from 'components/Footer/Footer'

import React from 'react'

export default function Registration() {
  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        <SignUp />
        <Footer />
      </div>
    </div>
  )
}
