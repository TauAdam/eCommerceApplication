import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'

import './index.css'
import ErrorPage from './pages/Error/ErrorPage'
import Registration from 'pages/Registration/Registration'
import Enter from 'pages/Enter/Enter'
import store from 'redux/store/store'
import { Product } from './pages/Product/Product'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Enter />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <Registration />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/product',
    element: <Product />,
    errorElement: <ErrorPage />,
  },
])

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  )
} else {
  console.error('Element with id "root" not found.')
}
