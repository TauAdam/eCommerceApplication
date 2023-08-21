import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from 'redux/slices/authSlice'

const initialIsAuthenticated = localStorage.getItem('customer') !== null

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
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
