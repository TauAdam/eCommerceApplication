import { createCart, getCart } from 'utils/cart'

export const getOrCreateCart = async () => {
  const customerString = localStorage.getItem('customer')
  const anonymousString = localStorage.getItem('anonymous')
  if (customerString) {
    const customer = JSON.parse(customerString)
    if (customer.card_id) return await getCart(customer.card_id)
    return await createCart()
  } else if (anonymousString) {
    const anonymous = JSON.parse(localStorage.getItem('anonymous') || '')
    if (anonymous.card_id) return await getCart(anonymous.card_id)
  }
  return await createCart()
}
