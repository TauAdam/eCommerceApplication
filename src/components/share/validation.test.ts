import { describe, expect, test } from '@jest/globals'
import { ErrorMessages } from './types'
import { validateEmail, validatePassword } from './validation'

describe('validate Email:', () => {
  test('Корректное значение', () => {
    expect(validateEmail('some@mail.com')).toEqual([])
  })
  test('Проверка на специальный символ', () => {
    expect(validateEmail('some@ma!l.com')).toEqual([ErrorMessages.emailFormat])
  })
  test('Проверка на пробел в середине', () => {
    expect(validateEmail('so me@mail.com')).toEqual([
      ErrorMessages.emailFormat,
      ErrorMessages.hasSpaces,
    ])
  })
  test('Проверка на пробел в начале', () => {
    expect(validateEmail(' some@mail.com')).toEqual([
      ErrorMessages.emailFormat,
      ErrorMessages.hasSpaces,
    ])
  })
  test('Проверка на отсутствие разделителя', () => {
    expect(validateEmail('someOmail.com')).toEqual([
      ErrorMessages.emailFormat,
      ErrorMessages.emailDelimiter,
    ])
  })
  test('Проверка на несоответствие формату e-mail', () => {
    expect(validateEmail('@somemail.com')).toEqual([ErrorMessages.emailFormat])
  })
})

describe('validate Password:', () => {
  test('Корректное значение', () => {
    expect(validatePassword('QWEqwe1!')).toEqual([])
  })
  test('Проверка на отсутствие специального символа', () => {
    expect(validatePassword('QWEqwe11')).toEqual([ErrorMessages.passwordSymbol])
  })
  test('Проверка на отсутствие заглавной буквы', () => {
    expect(validatePassword('qweqwe1!')).toEqual([ErrorMessages.passwordUpperCase])
  })
  test('Проверка на отсутствие маленькой буквы', () => {
    expect(validatePassword('QWEQWE1!')).toEqual([ErrorMessages.passwordLowerCase])
  })
  test('Проверка на отсутствие цифры', () => {
    expect(validatePassword('QWEqwe!!')).toEqual([ErrorMessages.passwordDigit])
  })
  test('Проверка на пробел в начале', () => {
    expect(validatePassword(' QWEqwe1!')).toEqual([ErrorMessages.hasSpaces])
  })
  test('Проверка на сравнение паролей', () => {
    expect(validatePassword('QWEqwe1!', 'QWEqwe1!')).toEqual([])
  })
  test('Проверка на множество ошибок', () => {
    expect(validatePassword('qweqwe!!', 'QWEqwe1!')).toEqual([
      ErrorMessages.passwordUpperCase,
      ErrorMessages.passwordDigit,
      ErrorMessages.passwordEqual,
    ])
  })
})
