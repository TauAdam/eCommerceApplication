import React from 'react'
import { useRouteError } from 'react-router-dom'
import './ErrorPage.css'
import MainButton from 'components/MainButton/MainButton'

interface CustomError {
  statusText?: string
  message?: string
}

function ErrorPage() {
  const error = useRouteError() as CustomError | undefined

  if (error) {
    console.error(error)

    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, there is no such page, or I didn&apos;t find it</p>
        <MainButton />
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    )
  }

  return null
}

export default ErrorPage
