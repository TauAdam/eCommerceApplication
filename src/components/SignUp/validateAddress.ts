import { ErrorMessages } from 'components/share/types'
import { regSpecSymbol } from 'components/share/validation'

function checkInputError(value: string, type: string, errors: string[]): string[] {
  const message = `Заполните поле "${type}"`
  if (value.length === 0) {
    return [...errors, message]
  } else {
    return errors
  }
}

export function getInputValue(input: HTMLInputElement | HTMLSelectElement | null): string {
  if (input) return input.value
  return ''
}

function validatePostal(postalCode: string, countryValue: string, errors: string[] = []) {
  const regRU_KZ = /^\d{6}$/
  const regUS = /(^\d{5}$|^\d{5}-\d{4}$)/

  if (countryValue === 'RU' || countryValue === 'KZ') {
    if (postalCode.match(regRU_KZ) === null) errors.push(ErrorMessages.postalRU)
  } else if (countryValue === 'US') {
    if (postalCode.match(regUS) === null) errors.push(ErrorMessages.postalUS)
  }
  return errors
}

function validateCity(city: string, errors: string[] = []): string[] {
  const regDigit = /\d/
  if (city.match(regSpecSymbol) !== null) errors.push(`Название города ${ErrorMessages.hasSymbol}`)
  if (city.match(regDigit) !== null) errors.push(`Название города ${ErrorMessages.hasDigit}`)
  return errors
}

export function validateAll(
  postalCode: string,
  country: string,
  city: string,
  street: string,
  building: string
) {
  let errorsArray = validatePostal(postalCode, country)
  errorsArray = checkInputError(city, 'Город', errorsArray)
  errorsArray = validateCity(city, errorsArray)
  errorsArray = checkInputError(street, 'Улица', errorsArray)
  errorsArray = checkInputError(building, 'Здание', errorsArray)

  return errorsArray
}
