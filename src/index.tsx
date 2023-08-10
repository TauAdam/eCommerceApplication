import React from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App'
import contactReducer from './redux/slices/contactSlice'

import './index.css'
import ErrorPage from './pages/Error/ErrorPage'
import Contact from './routers/Contact'
import LogIn from 'components/LogIn/LogIn'
import SignUp from 'components/SignUp/SignUp'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'contacts/:contactId',
    element: <Contact />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
])

const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
})

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
