import { Product } from '@commercetools/platform-sdk'

export function parseFetchedData(products: Product[]) {
  const essentialProductData = products.map((product: Product) => {
    const name = product.masterData.current.name['en-US']
    const images = product.masterData.staged.masterVariant?.images?.map((image) => image.url) || []
    const description = product.masterData.staged.description?.['en'] || 'Sample description'
    const prices = product.masterData.current.masterVariant.prices
    const attributes = product.masterData.current.masterVariant.attributes

    return {
      name,
      images,
      description,
      id: product.id,
      prices,
      attributes,
    }
  })

  return essentialProductData
}
