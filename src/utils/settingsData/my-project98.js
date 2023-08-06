// import { createClient } from '@commercetools/sdk-client'
// import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
// import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'

// const projectKey = 'my-project98'

// const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
//   host: 'https://auth.europe-west1.gcp.commercetools.com',
//   projectKey,
//   credentials: {
//     clientId: 'Zn03ugFjIoaOP5zfNAghuaMC',
//     clientSecret: 'G-EXHhCAqosL5chavJKVOvv8INrsQa0T',
//   },
//   scopes: ['manage_project:my-project98'],
// })
// const httpMiddleware = createHttpMiddleware({
//   host: 'https://api.europe-west1.gcp.commercetools.com',
// })
// const client = createClient({
//   middlewares: [authMiddleware, httpMiddleware],
// })
