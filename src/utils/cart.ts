import { Cart } from '@commercetools/platform-sdk'

const projectKey = 'my-project98'
const apiYrl = 'https://api.europe-west1.gcp.commercetools.com'
const authUrl = 'https://auth.europe-west1.gcp.commercetools.com'
const myClientId = 'NRuZMmzXpEZWUH1MO6ChBpxM'
const myClientSecret = 'HlHla0jmI9H8J9EMsOjF5Mzq4t78Q-Cg'

type createCartBody = {
  currency: string
  country: string
  customerId?: string
  customerEmail?: string
  deleteDaysAfterLastModification?: number
}

interface IAnonumousToken {
  access_token: string
  expires_in: number
  scope: string
  refresh_token: string
  token_type: 'Bearer'
  token_date?: number
}

async function getAnonymousToken() {
  try {
    const response = await fetch(`${authUrl}/oauth/${projectKey}/anonymous/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${myClientId}:${myClientSecret}`),
      },
      body: `grant_type=client_credentials&scope=view_published_products:${projectKey} manage_my_orders:${projectKey} manage_my_profile:${projectKey}`,
    })

    const data = (await response.json()) as IAnonumousToken
    const now = new Date().getTime()
    data.token_date = now
    localStorage.setItem('anonymous', JSON.stringify(data))
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export async function getCart(id: string) {
  const customerToken = await getTokenFromLocal()

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/me/carts/${id}`, {
      headers: {
        Authorization: `Bearer ${customerToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Getting cart failed!')
    }

    const data = (await response.json()) as Cart
    return data
  } catch (error) {
    throw error
  }
}

function getFromLocal(localName: string) {
  const customerString = localStorage.getItem(localName)
  return customerString ? JSON.parse(customerString) : null
}

interface IRefreshResponse {
  access_token: string
  expires_in: number
  scope: string
  token_type: 'Bearer'
}

async function refreshToken(refresh: string) {
  try {
    const response = await fetch(`${authUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${myClientId}:${myClientSecret}`),
      },
      body: `grant_type=refresh_token&refresh_token=${refresh}`,
    })

    const data = (await response.json()) as IRefreshResponse
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

async function getTokenFromLocal(): Promise<string> {
  const customer = getFromLocal('customer')
  const now = new Date().getTime()
  if (customer) {
    if (now > customer.token_date + customer.expires_in * 1000) {
      const newAccess = await refreshToken(customer.refresh_token)
      customer.access_token = newAccess?.access_token
      customer.token_date = now
      if (newAccess && newAccess.access_token) {
        localStorage.setItem('customer', JSON.stringify(customer))
        return newAccess.access_token
      } else {
        throw new Error('current token expired. Failed to get refresh token')
      }
    }
    return customer.access_token
  } else {
    const anonymous = getFromLocal('anonymous')
    if (anonymous) {
      if (now > anonymous.token_date + anonymous.expires_in * 1000) {
        const newAccess = await refreshToken(anonymous.refresh_token)
        anonymous.access_token = newAccess?.access_token
        anonymous.token_date = now
        if (newAccess && newAccess.access_token) {
          localStorage.setItem('anonymous', JSON.stringify(anonymous))
          return newAccess.access_token
        } else {
          throw new Error('current anonymous token expired. Failed to update with refresh token')
        }
      }
      return anonymous.access_token
    } else {
      const anonymousToken = await getAnonymousToken()
      return anonymousToken!.access_token!
    }
  }
}

function setCartIdToLocal(cardId: string): void {
  const customer = getFromLocal('customer')
  if (customer) {
    customer.card_id = cardId
    localStorage.setItem('customer', JSON.stringify(customer))
  } else {
    const anonymous = getFromLocal('anonymous')
    if (anonymous) {
      anonymous.card_id = cardId
      localStorage.setItem('anonymous', JSON.stringify(anonymous))
    }
  }
}

export async function createCart(currency: string = 'USD', country: string = 'US') {
  const requestBody: createCartBody = { currency, country }
  const customerToken = await getTokenFromLocal()

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/me/carts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${customerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error('Cart creation failed!')
    }

    const data = (await response.json()) as Cart
    setCartIdToLocal(data.id)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function removeCart(id: string, version: number) {
  const customerToken = await getTokenFromLocal()

  const queryParam = `me/carts/${id}?version=${version}`

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/${queryParam}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${customerToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Getting cart failed!')
    }

    const data = (await response.json()) as Cart
    return data
  } catch (error) {
    throw error
  }
}

export async function addToCart(id: string, version: number, sku: string, quantity: number) {
  const customerToken = await getTokenFromLocal()

  const requestBody = {
    version,
    actions: [
      {
        action: 'addLineItem',
        sku,
        quantity,
      },
    ],
  }

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/me/carts/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${customerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (response.status === 400) {
      throw new Error('out of stock')
    }

    if (!response.ok) {
      throw new Error('Add to cart failed!')
    }

    const data = (await response.json()) as Cart
    return data
  } catch (error) {
    throw error
  }
}

export async function updateQuantity(
  id: string,
  version: number,
  lineItemId: string,
  quantity: number
) {
  const customerToken = await getTokenFromLocal()

  const requestBody = {
    version,
    actions: [
      {
        action: 'changeLineItemQuantity',
        lineItemId,
        quantity,
      },
    ],
  }

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/me/carts/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${customerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error('Update quantity failed!')
    }

    const data = (await response.json()) as Cart
    return data
  } catch (error) {
    throw error
  }
}

export async function removeFromCart(id: string, version: number, lineItemId: string) {
  const customerToken = await getTokenFromLocal()

  const requestBody = {
    version,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId,
      },
    ],
  }

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/me/carts/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${customerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error('Remove line item failed!')
    }

    const data = (await response.json()) as Cart
    return data
  } catch (error) {
    throw error
  }
}

function getCartIdFromLocal() {
  let currentInfo = getFromLocal('customer')
  if (currentInfo === null) currentInfo = getFromLocal('anonymous')
  if (currentInfo === null) {
    console.warn('cart id not found in local storage!')
    return null
  } else {
    return currentInfo.card_id
  }
}

export async function removeMyCart(version: number) {
  const card_id = getCartIdFromLocal()
  if (card_id === null) return
  const accessToken = await getTokenFromLocal()
  console.log('Cart id:', card_id)
  console.log('Access token:', accessToken)

  const url = `${apiYrl}/${projectKey}/me/carts/${card_id}?version=${version}`
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }

  try {
    const response = await fetch(url, { method: 'DELETE', headers })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Ответ сервера:', data)

    const customer = getFromLocal('customer')
    if (customer) {
      delete customer.card_id
      localStorage.setItem('customer', JSON.stringify(customer))
    }
    const anonymous = getFromLocal('anonymous')
    if (anonymous) {
      delete anonymous.card_id
      localStorage.setItem('anonymous', JSON.stringify(anonymous))
    }

    // Перезагрузка страницы после успешного выполнения запроса
    window.location.reload()
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error)
  }
}
