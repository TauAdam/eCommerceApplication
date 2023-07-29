import React from 'react'
import { useRouteError } from 'react-router-dom'
import './ErrorPage.css'

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
        <p>Сорян, такой страницы нет, или я её не нашёл</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    )
  }

  return null
}

export default ErrorPage
