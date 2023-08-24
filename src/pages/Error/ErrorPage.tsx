import React from 'react'
import { Link, useLocation, useRouteError } from 'react-router-dom'
import './ErrorPage.css'

interface CustomError {
  statusText?: string
  message?: string
}

function ErrorPage() {
  const error = useRouteError() as CustomError | undefined
  const location = useLocation()

  if (error) {
    return (
      <div className="error-page">
        <h1 className="error-title">Oops! 404</h1>
        <p className="error-text">
          <i className="error-highlight">{error.statusText || error.message}</i>
        </p>
        <p className="error-text">
          Sorry, there is no <strong className="error-highlight">{location.pathname}</strong> page,
          or I didn&apos;t find it
        </p>
        <Link to="/" className="error-link">
          Return to Main Page
        </Link>
      </div>
    )
  }

  return null
}

export default ErrorPage
