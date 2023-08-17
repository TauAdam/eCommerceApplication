import { createSlice } from '@reduxjs/toolkit'

export const testSlice = createSlice({
  name: 'info',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    getDataRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      }
    },
    getDataSuccess: (state, action) => {
      return {
        data: action.payload,
        loading: false,
        error: null,
      }
    },
    getDataError: (state, action) => {
      return {
        data: null,
        loading: false,
        error: action.payload,
      }
    },
  },
})

export default testSlice.reducer
