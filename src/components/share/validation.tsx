import React from 'react'

function validateEmail(email: string) {
  const emErrors: string[] = []
  const emailTemplate = /\w+@\w+(.com|.ru)/
  const domainTemplate = /.+(.com|.ru)/
  if (email.match(emailTemplate) === null) emErrors.push('должна быть формата "users@mail.com"')
  if (email.match(domainTemplate) === null)
    emErrors.push('должна содержать домен, например "...mail.com"')
  if (email.match('@') === null) emErrors.push('должна содержать разделитель"@"')
  if (email[0] === ' ' || email[email.length - 1] === ' ')
    emErrors.push('содержит пробелы в начале или конце строки')
  return emErrors
  //setEmailErrors(emErrors)
}

function validatePassword(password: string) {
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
  return passErrors
  // setPasswordErrors(passErrors)
}

function showErrors(errors: string[]) {
  return (
    <ul>
      {errors.map((el, index) => (
        <li key={index}>{el}</li>
      ))}
    </ul>
  )
}

export { validateEmail, validatePassword, showErrors }
