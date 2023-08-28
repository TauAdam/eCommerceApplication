import { configureStore } from '@reduxjs/toolkit'
import auth from 'redux/slices/authSlice'
import products from '../slices/productsSlice'

const initialIsAuthenticated = localStorage.getItem('customer') !== null

export const store = configureStore({
  reducer: {
    auth,
    products,
  },
  preloadedState: {
    auth: {
      isAuthenticated: initialIsAuthenticated,
    },
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
