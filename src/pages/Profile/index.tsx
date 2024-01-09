import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import ProfileInfo from 'components/ProfileInfo/index'

import React from 'react'

import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import './Profile.css'

export default function Profile() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />
  }

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
