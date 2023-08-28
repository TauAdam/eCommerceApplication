import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../components/share/types'

interface ProductsState {
  productsList: IProduct[]
  loading: boolean
  errorMessage: string
}

const initialState: ProductsState = { productsList: [], loading: false, errorMessage: '' }

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsRequested(state) {
      state.loading = true
    },
    productsLoaded(state, action: PayloadAction<IProduct[]>) {
      state.productsList = action.payload
      state.loading = false
    },
    productsError(state, action: PayloadAction<string>) {
      state.loading = false
      state.errorMessage = action.payload
    },
  },
})
export const { productsLoaded, productsRequested, productsError } = productsSlice.actions

export default productsSlice.reducer
