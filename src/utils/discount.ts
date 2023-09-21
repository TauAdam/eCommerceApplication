import { CartDiscount } from '@commercetools/platform-sdk'
import { getAccessToken } from './requests'

// const region = 'europe-west1'
const projectKey = 'my-project98'
// const clientId = 'Zn03ugFjIoaOP5zfNAghuaMC'
// const clientSecret = 'G-EXHhCAqosL5chavJKVOvv8INrsQa0T'
// const authUrl = 'https://auth.europe-west1.gcp.commercetools.com'
const apiYrl = 'https://api.europe-west1.gcp.commercetools.com'
// const scope = 'manage_project:my-project98'

/*

*/

export async function getCartDiscount(key: string) {
  const accessToken = await getAccessToken()

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/cart-discounts/key=${key}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Getting cart failed!')
    }

    const data = (await response.json()) as CartDiscount
    return data
  } catch (error) {
    throw error
  }
}

interface ICartDiscount {
  key?: string
  name: {
    en: string
  }
  value: {
    type: 'relative'
    permyriad: number
  }
  target: {
    type: string
    predicate: string
  }
  cartPredicate: string
  sortOrder: string
  isActive?: boolean
}

export async function createCartDiscount(
  myName: string,
  permyriad: number,
  sortOrder: string,
  isActive: boolean = false,
  myKey: string | undefined = undefined,
  cartPredicate: string = 'lineItemTotal(true) >=  "0.00 USD"'
) {
  const accessToken = await getAccessToken()
  const key = myKey ? myKey : myName

  const newCartDiscount: ICartDiscount = {
    key,
    name: {
      en: myName,
    },
    value: {
      type: 'relative',
      permyriad,
    },
    target: {
      type: 'lineItems',
      predicate: 'true',
    },
    cartPredicate,
    sortOrder,
    isActive,
  }

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/cart-discounts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCartDiscount),
    })

    if (!response.ok) {
      throw new Error('Cart discount creation failed!')
    }

    const data = (await response.json()) as CartDiscount
    console.log(data)
    return data
  } catch (error) {
    throw error
  }
}

export async function setCartDiscountActive(isActive: boolean, myKey: string) {
  const accessToken = await getAccessToken()

  try {
    const cartDiscount = await getCartDiscount(myKey)
    if (cartDiscount.isActive === isActive) return cartDiscount

    const requestBody = {
      version: cartDiscount.version,
      actions: [
        {
          action: 'changeIsActive',
          isActive,
        },
      ],
    }

    const response = await fetch(`${apiYrl}/${projectKey}/cart-discounts/key=${myKey}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`CartDiscount setting to ${isActive} failed!`)
    }

    const data = (await response.json()) as CartDiscount
    console.log(data.isActive)
    return data
  } catch (error) {
    if (error instanceof Error) {
      return
      // console.log(error)
      // if (error.message !== "'isActive' has no changes.") console.warn(error.message)
    }
  }
}

/*
const region = 'europe-west1'
const projectKey = 'my-project98'
const clientId = 'Zn03ugFjIoaOP5zfNAghuaMC'
const clientSecret = 'G-EXHhCAqosL5chavJKVOvv8INrsQa0T'
const authUrl = 'https://auth.europe-west1.gcp.commercetools.com'
const apiYrl = 'https://api.europe-west1.gcp.commercetools.com'
const scope = 'manage_project:my-project98'

function getCookie() {
  const name = 'access_token='
  const cookieArray = document.cookie.split(';')

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(name) === 0) {
      // console.log(cookie.substring(name.length, cookie.length))

      return cookie.substring(name.length, cookie.length)
    }
  }
  return null
}

async function getToken() {
  const tokenResponse = await fetch(
    `${authUrl}/oauth/token?grant_type=client_credentials&scope=${scope}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
    }
  )

  if (!tokenResponse.ok) {
    throw new Error('Failed to fetch access token')
  }

  const tokenData = await tokenResponse.json()
  const accessToken = tokenData.access_token

  document.cookie = `access_token=${accessToken}; expires=${new Date(
    tokenData.expires_in + Date.now()
  ).toUTCString()}`
}

async function getAccessToken() {
  let accessToken = getCookie()

  if (accessToken === null) {
    await getToken()
    accessToken = getCookie()
  }

  return accessToken
}

async function createCartDiscount(
  myName,
  permyriad,
  sortOrder,
  isActive = true,
  myKey = undefined,
  cartPredicate = 'lineItemTotal(true) >=  "0.00 USD"'
) {
  const accessToken = await getAccessToken()
  const key = myKey ? myKey : myName

  const newCartDiscount = {
    key,
    name: {
      en: myName,
    },
    value: {
      type: 'relative',
      permyriad,
    },
    target: {
      type: 'lineItems',
      predicate: 'true',
    },
    cartPredicate,
    sortOrder,
    isActive,
  }

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/cart-discounts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCartDiscount),
    })

    if (!response.ok) {
      throw new Error('Cart discount creation failed!')
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    throw error
  }
}

console.log(await createCartDiscount('discount10', 1000, '0.1'))
*/
