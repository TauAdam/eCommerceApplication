import fetch from 'node-fetch'
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2'

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'my-project98',
  credentials: {
    clientId: 'NRuZMmzXpEZWUH1MO6ChBpxM',
    clientSecret: 'HlHla0jmI9H8J9EMsOjF5Mzq4t78Q-Cg',
  },
  scopes: [
    'manage_my_orders:my-project98 view_published_products:my-project98 manage_my_profile:my-project98 create_anonymous_token:my-project98 view_categories:my-project98 manage_my_payments:my-project98 manage_my_shopping_lists:my-project98 manage_my_quotes:my-project98 manage_my_quote_requests:my-project98 manage_my_business_units:my-project98',
  ],
  fetch,
}

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
}

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build()
