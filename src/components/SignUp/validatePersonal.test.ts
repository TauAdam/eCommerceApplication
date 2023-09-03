import { describe, expect, test } from '@jest/globals'
import { validateAll } from './validatePersonal'
import { ErrorMessages } from 'components/share/types'

describe('validate address inputs:', () => {
  test('Корректное значение', () => {
    expect(validateAll('John', 'Down', '2000-01-20')).toEqual([])
  })
  test('Проверка на специальный символ', () => {
    expect(validateAll('Joh!n', 'Down', '2000-01-20')).toEqual(['Имя содержит спецсимволы'])
  })
  test('Проверка на цифру', () => {
    expect(validateAll('John', 'Dow1n', '2000-01-20')).toEqual(['Фамилия содержит цифру'])
  })
  test('Проверка на пробел', () => {
    expect(validateAll('John', 'Dow n', '2000-01-20')).toEqual(['Фамилия содержит пробел'])
  })
  test('Проверка на возраст', () => {
    expect(validateAll('John', 'Down', '2020-01-20')).toEqual([ErrorMessages.birthDate])
  })
})
