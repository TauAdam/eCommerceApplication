import { Price } from '@commercetools/platform-sdk'

export function transformPrices(prices?: Price[], country = 'US') {
  let discountedPrice
  let originalPrice

  if (prices) {
    const priceVariant = prices.find((el) => el.country === country)

    if (priceVariant) {
      const { value, discounted } = priceVariant
      const { centAmount, fractionDigits, currencyCode } = value

      originalPrice = getFormattedPrice(centAmount, fractionDigits, currencyCode)

      if (discounted) {
        const { centAmount: discCentAmount, fractionDigits: discFractionDigits } = discounted.value
        discountedPrice = getFormattedPrice(discCentAmount, discFractionDigits, currencyCode)
      }
    }
  }
  return { originalPrice, discountedPrice }
}
export function getFormattedPrice(
  centAmount: number,
  fractionDigits: number,
  currencyCode: string
): string {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  })
  return numberFormatter.format(centAmount / 10 ** fractionDigits)
}
