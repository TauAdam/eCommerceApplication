function validateEmail(email: string) {
  const emErrors: string[] = []
  const emailTemplate = /^\w+@\w+\.[a-z]{2,3}$/
  const domainTemplate = /.\.[a-z]{2,3}$/
  if (email.match(emailTemplate) === null) emErrors.push('должна быть формата "users@mail.com"')
  if (email.match(domainTemplate) === null)
    emErrors.push('должна содержать домен, например "...mail.com"')
  if (email.match('@') === null) emErrors.push('должна содержать разделитель"@"')
  if (email.indexOf(' ') !== -1) emErrors.push('содержит пробелы')
  return emErrors
}

function validatePassword(password: string, secondPassword: string | undefined = undefined) {
  const passErrors: string[] = []
  const uppercaseLetter = /[A-Z]/
  const lowercaseLetter = /[a-z]/
  const digit = /\d/
  const specSymbol =
    /(\!|\"|\#|\$|\%|\&|\'|\(|\)|\*|\+|\,|\-|\.|\/|\:|\;|\<|\=|\>|\?|\@|\[|\\|\]|\^|\_|\`|\{|\||\}|\~)/

  if (password.length < 8) passErrors.push('должен быть не короче 8 символов')
  if (password.match(uppercaseLetter) === null)
    passErrors.push('должен содержать хотя бы одну заглавную букву A-Z')
  if (password.match(lowercaseLetter) === null)
    passErrors.push('должен содержать хотя бы одну маленькую букву a-z')
  if (password.match(digit) === null) passErrors.push('должен содержать хотя бы одну цифру')
  if (password.match(specSymbol) === null)
    passErrors.push('должен содержать хотя бы один специальный символ')
  if (password[0] === ' ' || password[password.length - 1] === ' ')
    passErrors.push('содержит пробелы в начале или конце строки')
  if (secondPassword && password !== secondPassword) passErrors.push('пароли должны совпадать')
  return passErrors
}

export { validateEmail, validatePassword }
