/* eslint-disable */
const { createClient } = require('@commercetools/sdk-client')
const {
  createAuthMiddlewareForClientCredentialsFlow,
} = require('@commercetools/sdk-middleware-auth')
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http')
const fetch = require('node-fetch')

const projectKey = 'my-project98'

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'NRuZMmzXpEZWUH1MO6ChBpxM',
    clientSecret: 'HlHla0jmI9H8J9EMsOjF5Mzq4t78Q-Cg',
  },
  scopes: [
    'manage_my_orders:my-project98 view_published_products:my-project98 manage_my_profile:my-project98 create_anonymous_token:my-project98 view_categories:my-project98 manage_my_payments:my-project98 manage_my_shopping_lists:my-project98 manage_my_quotes:my-project98 manage_my_quote_requests:my-project98 manage_my_business_units:my-project98',
  ],
  fetch,
})
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
})
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
})
