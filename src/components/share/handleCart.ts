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
