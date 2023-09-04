import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import ProfileInfo from 'components/ProfileInfo/index'

import React from 'react'

import './Profile.css'

export default function Profile() {
  return (
    <div className="wrapperApp">
      <div className="box">
        <Header />
        <ProfileInfo />
        <Footer />
      </div>
    </div>
  )
}
