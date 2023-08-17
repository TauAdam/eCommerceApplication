import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from 'redux/slices/authSlice'
import { testSlice } from '../testData/reducer/test'

const initialIsAuthenticated = localStorage.getItem('customer') !== null

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    test: testSlice.reducer,
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
