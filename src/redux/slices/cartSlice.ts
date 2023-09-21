import { Cart } from '@commercetools/platform-sdk'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface cartsState {
  cart: Cart
}

const initialState: cartsState = {
  cart: {
    id: '',
    version: 1,
    createdAt: '2023-09-13T10:55:38.397Z',
    lastModifiedAt: '2023-09-13T11:33:04.885Z',
    lineItems: [],
    cartState: 'Inactive',
    totalPrice: {
      type: 'centPrecision',
      currencyCode: 'USD',
      centAmount: 0,
      fractionDigits: 2,
    },
    country: 'US',
    shippingMode: 'Single',
    shipping: [],
    customLineItems: [],
    discountCodes: [],
    directDiscounts: [],
    inventoryMode: 'None',
    taxMode: 'Platform',
    taxRoundingMode: 'HalfEven',
    taxCalculationMode: 'LineItemLevel',
    deleteDaysAfterLastModification: 1,
    refusedGifts: [],
    origin: 'Customer',
    itemShippingAddresses: [],
    totalLineItemQuantity: 0,
  },
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<Cart>) {
      state.cart = action.payload
    },
    deleteCart(state) {
      state.cart = initialState.cart
    },
  },
})
export const { setCart, deleteCart } = cartSlice.actions

export default cartSlice.reducer
