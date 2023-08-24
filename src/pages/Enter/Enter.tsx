import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import LogIn from 'components/LogIn/LogIn'

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../redux/store/store'

export default function Enter() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={'/'} />
  }

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
