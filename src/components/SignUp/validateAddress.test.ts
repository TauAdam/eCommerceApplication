import { describe, expect, test } from '@jest/globals'
import { ErrorMessages } from 'components/share/types'
import { validateAll } from './validateAddress'

describe('validate address inputs:', () => {
  test('Корректное значение', () => {
    expect(validateAll('101101', 'RU', 'Moscow', 'Orlova', '1')).toEqual([])
  })
  test('Проверка на некорректный почтовый код для RU и KZ региона', () => {
    expect(validateAll('10110', 'RU', 'Moscow', 'Orlova', '1')).toEqual([ErrorMessages.postalRU])
  })
  test('Проверка на некорректный почтовый код для US региона', () => {
    expect(validateAll('1011054', 'US', 'Moscow', 'Orlova', '1')).toEqual([ErrorMessages.postalUS])
  })
  test('Проверка на специальный символ или цифру в названии города', () => {
    expect(validateAll('101101', 'RU', 'Mo1scow!', 'Orlova', '1')).toEqual([
      `Название города ${ErrorMessages.hasSymbol}`,
      `Название города ${ErrorMessages.hasDigit}`,
    ])
  })
  test('Проверка на пустые значения', () => {
    expect(validateAll('101101', 'RU', '', '', '')).toEqual([
      'Заполните поле "Город"',
      'Заполните поле "Улица"',
      'Заполните поле "Здание"',
    ])
  })
})
