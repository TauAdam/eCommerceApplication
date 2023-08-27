export function validateName(name: string, nameType: string): string[] {
  const errors: string[] = []
  const regDigits = /\d+/
  const regSpecSymbol =
    /(\!|\"|\#|\$|\%|\&|\'|\(|\)|\*|\+|\,|\-|\.|\/|\:|\;|\<|\=|\>|\?|\@|\[|\\|\]|\^|\_|\`|\{|\||\}|\~)/

  if (name.match(regDigits) !== null) errors.push(`${nameType} содержит цифру`)
  if (name.match(regSpecSymbol) !== null) errors.push(`${nameType} содержит спецсимволы`)
  if (name.indexOf(' ') !== -1) errors.push(`${nameType} содержит пробел`)

  return errors
}

function validateBirth(birthDate: string) {
  const error: string[] = []
  const [birthYear, birthMonth, birthDay] = birthDate.split('-').map((x: string) => Number(x))
  const date = new Date()
  const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  const [yearDiff, monthDiff, dayDiff] = [year - birthYear, month - birthMonth, day - birthDay]
  if (yearDiff < 13) {
    error[0] = 'Покупатель должен быть не младше 13 лет'
  } else if (yearDiff === 13 && monthDiff < 0) {
    error[0] = 'Покупатель должен быть не младше 13 лет'
  } else if (yearDiff === 13 && monthDiff === 0 && dayDiff < 0) {
    error[0] = 'Покупатель должен быть не младше 13 лет'
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
