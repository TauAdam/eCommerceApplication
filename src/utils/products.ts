import { Price, Product } from '@commercetools/platform-sdk'

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

export function transformPrices(prices?: Price[], country = 'US') {
  let discountedPrice
  let originalPrice

  if (prices) {
    const priceVariant = prices.find((el) => el.country === country)

    if (priceVariant) {
      const { value, discounted } = priceVariant
      const { centAmount, fractionDigits, currencyCode } = value

      const numberFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      })

      originalPrice = numberFormatter.format(centAmount / 10 ** fractionDigits)

      if (discounted) {
        const { centAmount: discCentAmount, fractionDigits: discFractionDigits } = discounted.value
        discountedPrice = numberFormatter.format(discCentAmount / 10 ** discFractionDigits)
      }
    }
  }
  return { originalPrice, discountedPrice }
}
