import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import SignUp from 'components/SignUp/SignUp'

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../redux/store/store'

export default function Registration() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={'/'} />
  }
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
