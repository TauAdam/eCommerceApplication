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
  currencyCode: string,
  quantity = 1
): string {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  })
  return numberFormatter.format((centAmount * quantity) / 10 ** fractionDigits)
}
export function getPrices(priceObject: Price, quantity = 1) {
  let discountedPrice
  const { value, discounted } = priceObject
  const { centAmount, fractionDigits, currencyCode } = value

  const originalPrice = getFormattedPrice(centAmount, fractionDigits, currencyCode, quantity)

  if (discounted) {
    const { centAmount: discCentAmount, fractionDigits: discFractionDigits } = discounted.value
    discountedPrice = getFormattedPrice(discCentAmount, discFractionDigits, currencyCode, quantity)
  }
  return { originalPrice, discountedPrice }
}
