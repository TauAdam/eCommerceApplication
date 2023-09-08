import { createCart, getCart } from 'utils/requests'

export const getOrCreateCart = async () => {
  const customer = JSON.parse(localStorage.getItem('customer') || '')
  return customer.card_id ? await getCart(customer.card_id) : await createCart('USD')
}
