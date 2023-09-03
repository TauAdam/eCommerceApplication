import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import SignUp from 'components/SignUp'
import './Registration.css'

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks'

export default function Registration() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

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
