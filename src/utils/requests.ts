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
    tokenData.expires_in * 172800 + Date.now()
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

export async function makeApiCall() {
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

  const responseData = await response.json()
  console.log(responseData)

  return responseData
}
