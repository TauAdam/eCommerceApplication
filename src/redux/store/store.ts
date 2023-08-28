import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from 'redux/slices/authSlice'
import products from '../slices/productsSlice'

const initialIsAuthenticated = localStorage.getItem('customer') !== null

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products,
  },
  preloadedState: {
    auth: {
      isAuthenticated: initialIsAuthenticated,
    },
  },
})

export type RootState = ReturnType<typeof store.getState>

export const { login, logout } = authSlice.actions

export default store
