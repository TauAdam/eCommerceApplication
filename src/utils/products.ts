import { Product } from '@commercetools/platform-sdk'

export function parseFetchedData(products: Product[]) {
  const essentialProductData = products.map((product: Product) => {
    const name = product.masterData.current.name['en-US']
    const image = product.masterData.current.masterVariant?.images?.[0]?.url || ''
    const description = product.masterData.current.description?.['en-US'] || undefined
    const prices = product.masterData.current.masterVariant.prices

    return {
      name,
      image,
      description,
      id: product.id,
      prices,
    }
  })

  return essentialProductData
}
