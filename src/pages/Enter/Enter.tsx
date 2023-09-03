import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import LogIn from 'components/LogIn'

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks'

export default function Enter() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

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
