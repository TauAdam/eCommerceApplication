import { Cart } from '@commercetools/platform-sdk'

export const handlePrice = (original: string | undefined, discounted: string | undefined) => {
  if (discounted) return Number(discounted.slice(1).split('.').join(''))
  if (original) return Number(original.slice(1).split('.').join(''))
  return 0
}

export const getLineItemId = (cart: Cart, productID: string) => {
  const lineItem = cart.lineItems.find((item) => item.productId === productID)
  return lineItem?.id || ''
}

export const setInitialAmount = (cart: Cart, productID: string) => {
  const lineItem = cart.lineItems.find((item) => item.productId === productID)
  console.log(lineItem)
  return lineItem?.quantity || 0
}

export const cartInitialState: Cart = {
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
}
