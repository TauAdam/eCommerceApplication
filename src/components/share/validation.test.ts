import { describe, expect, test } from '@jest/globals'
import { validateEmail, validatePassword } from './validation'

describe('validate Email:', () => {
  test('Корректное значение', () => {
    expect(validateEmail('some@mail.com')).toEqual([])
  })
  test('Проверка на специальный символ', () => {
    expect(validateEmail('some@ma!l.com')).toEqual(['должна быть формата "users@mail.com"'])
  })
  test('Проверка на пробел в середине', () => {
    expect(validateEmail('so me@mail.com')).toEqual([
      'должна быть формата "users@mail.com"',
      'содержит пробелы',
    ])
  })
  test('Проверка на пробел в начале', () => {
    expect(validateEmail(' some@mail.com')).toEqual([
      'должна быть формата "users@mail.com"',
      'содержит пробелы',
    ])
  })
  test('Проверка на отсутствие разделителя', () => {
    expect(validateEmail('someOmail.com')).toEqual([
      'должна быть формата "users@mail.com"',
      'должна содержать разделитель"@"',
    ])
  })
  test('Проверка на несоответствие формату e-mail', () => {
    expect(validateEmail('@somemail.com')).toEqual(['должна быть формата "users@mail.com"'])
  })
})

describe('validate Password:', () => {
  test('Корректное значение', () => {
    expect(validatePassword('QWEqwe1!')).toEqual([])
  })
  test('Проверка на отсутствие специального символа', () => {
    expect(validatePassword('QWEqwe11')).toEqual([
      'должен содержать хотя бы один специальный символ',
    ])
  })
  test('Проверка на отсутствие заглавной буквы', () => {
    expect(validatePassword('qweqwe1!')).toEqual([
      'должен содержать хотя бы одну заглавную букву A-Z',
    ])
  })
  test('Проверка на отсутствие маленькой буквы', () => {
    expect(validatePassword('QWEQWE1!')).toEqual([
      'должен содержать хотя бы одну маленькую букву a-z',
    ])
  })
  test('Проверка на отсутствие цифры', () => {
    expect(validatePassword('QWEqwe!!')).toEqual(['должен содержать хотя бы одну цифру'])
  })
  test('Проверка на пробел в начале', () => {
    expect(validatePassword(' QWEqwe1!')).toEqual(['содержит пробелы в начале или конце строки'])
  })
  test('Проверка на сравнение паролей', () => {
    expect(validatePassword('QWEqwe1!', 'QWEqwe1!')).toEqual([])
  })
  test('Проверка на множество ошибок', () => {
    expect(validatePassword('qweqwe!!', 'QWEqwe1!')).toEqual([
      'должен содержать хотя бы одну заглавную букву A-Z',
      'должен содержать хотя бы одну цифру',
      'пароли должны совпадать',
    ])
  })
})
