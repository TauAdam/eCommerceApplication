import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'

import Enter from 'pages/Enter/Enter'
import Registration from 'pages/Registration/Registration'
import './index.css'
import { CatalogPage } from './pages/CatalogPage'
import ErrorPage from './pages/Error/ErrorPage'
import { Product } from './pages/Product/Product'
import Profile from './pages/Profile/Profile'
import { store } from './redux/store/store'

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
  {
  {
    path: '/profile',
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/catalog',
    element: <CatalogPage />,
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
