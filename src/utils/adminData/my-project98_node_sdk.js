// const { createClient } = require('@commercetools/sdk-client')
// const {
//   createAuthMiddlewareForClientCredentialsFlow,
// } = require('@commercetools/sdk-middleware-auth')
// const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http')
// const fetch = require('node-fetch')

// const projectKey = 'my-project98'

// const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
//   host: 'https://auth.europe-west1.gcp.commercetools.com',
//   projectKey,
//   credentials: {
//     clientId: 'Zn03ugFjIoaOP5zfNAghuaMC',
//     clientSecret: 'G-EXHhCAqosL5chavJKVOvv8INrsQa0T',
//   },
//   scopes: ['manage_project:my-project98'],
//   fetch,
// })
// const httpMiddleware = createHttpMiddleware({
//   host: 'https://api.europe-west1.gcp.commercetools.com',
//   fetch,
// })
// const client = createClient({
//   middlewares: [authMiddleware, httpMiddleware],
// })
