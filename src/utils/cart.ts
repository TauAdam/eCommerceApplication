import { Cart } from '@commercetools/platform-sdk'

const projectKey = 'my-project98'
const apiYrl = 'https://api.europe-west1.gcp.commercetools.com'
const authUrl = 'https://auth.europe-west1.gcp.commercetools.com'

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
}

async function getAnonymousToken() {
  const myClientId = 'NRuZMmzXpEZWUH1MO6ChBpxM' // TODO: make global variables
  const myClientSecret = 'HlHla0jmI9H8J9EMsOjF5Mzq4t78Q-Cg'
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

async function getTokenFromLocal(): Promise<string> {
  const customer = getFromLocal('customer')

  if (customer) {
    return customer.access_token
  } else {
    const anonymous = getFromLocal('anonymous')
    if (anonymous) {
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
