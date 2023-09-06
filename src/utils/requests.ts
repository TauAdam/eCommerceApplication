import { Product, ProductPagedQueryResponse } from '@commercetools/platform-sdk'
import { ICustomer } from 'components/ProfileInfo/ProfileTypes'
import { ChangeType, IAddress } from 'components/share/types'
import { parseFetchedData } from './products'

// const region = 'europe-west1'
const projectKey = 'my-project98'
const clientId = 'Zn03ugFjIoaOP5zfNAghuaMC'
const clientSecret = 'G-EXHhCAqosL5chavJKVOvv8INrsQa0T'
const authUrl = 'https://auth.europe-west1.gcp.commercetools.com'
const apiYrl = 'https://api.europe-west1.gcp.commercetools.com'
const scope = 'manage_project:my-project98'

export async function getToken() {
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

  console.log('Access Token:', accessToken)
}

export function getCookie() {
  const name = 'access_token='
  const cookieArray = document.cookie.split(';')

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(name) === 0) {
      console.log(cookie.substring(name.length, cookie.length))

      return cookie.substring(name.length, cookie.length)
    }
  }
  return null
}

export async function getProductsFromApi() {
  const apiUrl = `${apiYrl}/${projectKey}/products`

  const accessToken = getCookie()

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('API Call Failed')
  }

  const responseData: ProductPagedQueryResponse = await response.json()
  return responseData.results
}

export async function getProductById(id: string) {
  const apiUrl = `${apiYrl}/${projectKey}/products/${id}`

  const accessToken = getCookie()

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('API Call Failed')
  }

  const responseData: Product = await response.json()
  const result = parseFetchedData([responseData])
  console.log(responseData)
  return result
}

async function getAccessToken() {
  let accessToken = getCookie()

  if (accessToken === null) {
    await getToken()
    accessToken = getCookie()
  }

  return accessToken
}

type NewCustomer = {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  addresses: IAddress[]
  defaultShippingAddress?: number
  defaultBillingAddress?: number
}

export async function createCustomer(
  customerEmail: string,
  customerPassword: string,
  customerFirstName: string,
  customerLastName: string,
  customerDateOfBirth: string,
  billing: IAddress,
  shipping: IAddress
) {
  const accessToken = await getAccessToken()

  const newCustomer: NewCustomer = {
    email: customerEmail,
    password: customerPassword,
    firstName: customerFirstName,
    lastName: customerLastName,
    dateOfBirth: customerDateOfBirth,
    addresses: [{ ...billing }, { ...shipping }],
  }

  if (billing.asDefault) newCustomer.defaultBillingAddress = 0
  if (shipping.asDefault) newCustomer.defaultShippingAddress = 1

  console.log('Fetch body:\n', newCustomer)

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/customers`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(newCustomer),
    })

    if (response.status === 400) {
      throw new Error('Пользователь c такой почтой уже существует!')
    }
    if (!response.ok) {
      throw new Error('Customer creation failed!')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function loginCustomer(customerEmail: string, customerPassword: string = '') {
  const accessToken = await getAccessToken()

  try {
    // https://docs.commercetools.com/api/projects/customers#authenticate-sign-in-customer
    const response = await fetch(`${apiYrl}/${projectKey}/login`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`, //${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: customerEmail,
        password: customerPassword,
      }),
    })

    const authData = await response.json()
    console.log('customer-id: ', authData.customer.id)
    // localStorage.setItem('customer-id', authData.customer.id) // можем сохранить корректно авторизованного пользователя
    return authData.customer.id || null
  } catch (error) {
    if (error instanceof Error) {
      console.error('Login Error:\n', error.message)
    }
    return null
  }
}

export async function getCustomerToken(email: string, password: string) {
  const myClientId = 'NRuZMmzXpEZWUH1MO6ChBpxM' // TODO: make global variables
  const myClientSecret = 'HlHla0jmI9H8J9EMsOjF5Mzq4t78Q-Cg'
  try {
    const response = await fetch(`${authUrl}/oauth/${projectKey}/customers/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${myClientId}:${myClientSecret}`),
      },
      body: `grant_type=password&username=${email}&password=${password}`,
    })

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export async function getCustomer(id: string) {
  const accessToken = await getAccessToken()

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Get customer request failed with status code ${response.status}`)
    }

    const data = (await response.json()) as ICustomer
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export async function updateCustomer(
  id: string,
  version: number,
  actions: ChangeType[]
): Promise<ICustomer | undefined> {
  const accessToken = await getAccessToken()

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/customers/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        version,
        actions,
      }),
    })

    if (!response.ok) {
      throw new Error(`update failed with status code ${response.status}`)
    }

    const data = (await response.json()) as ICustomer
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export async function changePassword(
  id: string,
  version: number,
  currentPassword: string,
  newPassword: string
) {
  const accessToken = await getAccessToken()

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/customers/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id,
        version,
        currentPassword,
        newPassword,
      }),
    })

    if (!response.ok) {
      throw new Error(`password change failed with status code ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export async function getCategories() {
  const accessToken = await getAccessToken()

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/categories/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()
    console.log('Категории:\n', data)
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export async function updateProduct(id: string, actions: ChangeType[], version: number) {
  const accessToken = await getAccessToken()

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/products/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions,
      }),
    })

    const data = await response.json()
    console.log('Обновлено:\n', data)
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export async function addProductImage(
  id: string,
  imageUrl: string,
  dimentionW: number,
  dimentionH: number,
  variantId: number,
  version: number = 1
) {
  const accessToken = await getAccessToken()

  try {
    const response = await fetch(`${apiYrl}/${projectKey}/products/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'addExternalImage',
            variantId,
            image: {
              url: imageUrl,
              dimensions: {
                w: dimentionW,
                h: dimentionH,
              },
            },
          },
        ],
      }),
    })

    const data = await response.json()
    console.log('Обновлено:\n', data)
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export async function getProductsFromCategory(categoryId: string) {
  const apiUrl = `${apiYrl}/${projectKey}/products`

  const accessToken = getCookie()

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Categories Call Failed')
  }

  const responseData: ProductPagedQueryResponse = await response.json()
  const products = responseData.results.filter((el) => {
    const categories = el.masterData.staged.categories
    return categories.some((category) => category.id === categoryId)
  })
  return products
}

// export async function getProductsFromCategory(id: string) {
//   const apiUrl = `${apiYrl}/${projectKey}/product-projections/search?filter=categories.id:${id}`

//   const accessToken = getCookie()

//   const response = await fetch(apiUrl, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   })

//   if (!response.ok) {
//     throw new Error('API Call Failed')
//   }

//   const responseData = await response.json()
//   for (const key in responseData) {
//     console.log(responseData[key])
//   }
//   return responseData
// }
