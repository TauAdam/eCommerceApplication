import { ErrorMessages } from './types'

export const regSpecSymbol =
  /(\!|\"|\#|\$|\%|\&|\'|\(|\)|\*|\+|\,|\-|\.|\/|\:|\;|\<|\=|\>|\?|\@|\[|\\|\]|\^|\_|\`|\{|\||\}|\~)/

export const hasSpaces = (someString: string) => (someString.indexOf(' ') === -1 ? false : true)

function validateEmail(email: string) {
  const emErrors: string[] = []
  const emailTemplate = /^\w+@\w+\.[a-z]{2,3}$/
  const domainTemplate = /.\.[a-z]{2,3}$/
  if (email.match(emailTemplate) === null) emErrors.push(ErrorMessages.emailFormat)
  if (email.match(domainTemplate) === null) emErrors.push(ErrorMessages.emailDomain)
  if (email.match('@') === null) emErrors.push(ErrorMessages.emailDelimiter)
  if (hasSpaces(email)) emErrors.push(ErrorMessages.hasSpaces)
  return emErrors
}

function validatePassword(password: string, secondPassword: string | undefined = undefined) {
  const passErrors: string[] = []
  const uppercaseLetter = /[A-Z]/
  const lowercaseLetter = /[a-z]/
  const digit = /\d/

  if (password.length < 8) passErrors.push(ErrorMessages.passwordLength)
  if (password.match(uppercaseLetter) === null) passErrors.push(ErrorMessages.passwordUpperCase)
  if (password.match(lowercaseLetter) === null) passErrors.push(ErrorMessages.passwordLowerCase)
  if (password.match(digit) === null) passErrors.push(ErrorMessages.passwordDigit)
  if (password.match(regSpecSymbol) === null) passErrors.push(ErrorMessages.passwordSymbol)
  if (hasSpaces(password)) passErrors.push(ErrorMessages.hasSpaces)
  if (secondPassword && password !== secondPassword) passErrors.push(ErrorMessages.passwordEqual)
  return passErrors
}

export { validateEmail, validatePassword }
