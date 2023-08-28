import { Product, ProductPagedQueryResponse } from '@commercetools/platform-sdk'

export function parseFetchedData(fetchedData: ProductPagedQueryResponse) {
  const products = fetchedData.results
  const essentialProductData = products.map((product: Product) => {
    const name = product.masterData.current.name['en-US']
    const image = product.masterData.current.masterVariant?.images?.[0]?.url || ''
    const description = product.masterData.current.description?.['en-US'] || undefined

    return {
      name,
      image,
      description,
      id: product.id,
    }
  })

  return essentialProductData
}
