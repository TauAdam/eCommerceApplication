import { ErrorMessages } from 'components/share/types'
import { hasSpaces, regSpecSymbol } from 'components/share/validation'

export function validateName(name: string, nameType: string): string[] {
  const errors: string[] = []
  const regDigits = /\d+/
  if (name === '') errors.push(`Заполните поле "${nameType}"`)
  if (name.match(regDigits) !== null) errors.push(`${nameType} ${ErrorMessages.hasDigit}`)
  if (name.match(regSpecSymbol) !== null) errors.push(`${nameType} ${ErrorMessages.hasSymbol}`)
  if (hasSpaces(name)) errors.push(`${nameType} ${ErrorMessages.hasSpaces}`)

  return errors
}

export function validateBirth(birthDate: string) {
  const error: string[] = []
  const [birthYear, birthMonth, birthDay] = birthDate.split('-').map((x: string) => Number(x))
  const date = new Date()
  const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  const [yearDiff, monthDiff, dayDiff] = [year - birthYear, month - birthMonth, day - birthDay]
  if (yearDiff < 13) {
    error[0] = ErrorMessages.birthDate
  } else if (yearDiff === 13 && monthDiff < 0) {
    error[0] = ErrorMessages.birthDate
  } else if (yearDiff === 13 && monthDiff === 0 && dayDiff < 0) {
    error[0] = ErrorMessages.birthDate
  }

  return error
}

export function validateAll(name: string, lastName: string, birthDate: string): string[] {
  return [
    ...validateName(name, 'Имя'),
    ...validateName(lastName, 'Фамилия'),
    ...validateBirth(birthDate),
  ]
}
