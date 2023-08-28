import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../components/share/types'

interface ProductsState {
  productsList: IProduct[]
}

const initialState = { productsList: [] } as ProductsState

const productsSlice = createSlice({
  name: 'productsList',
  initialState,
  reducers: {
    setProductsList(state, action: PayloadAction<IProduct[]>) {
      state.productsList = action.payload
    },
  },
})
export const { setProductsList } = productsSlice.actions

export default productsSlice.reducer
