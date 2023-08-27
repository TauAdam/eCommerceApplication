import { describe, expect, test } from '@jest/globals'
import { validateAll } from './validateAddress'

describe('validate address inputs:', () => {
  test('Корректное значение', () => {
    expect(validateAll('101101', 'RU', 'Moscow', 'Orlova', '1')).toEqual([])
  })
  test('Проверка на некорректный почтовый код для RU и KZ региона', () => {
    expect(validateAll('10110', 'RU', 'Moscow', 'Orlova', '1')).toEqual([
      'Почтовый код страны должен быть формата NNNNNN',
    ])
  })
  test('Проверка на некорректный почтовый код для US региона', () => {
    expect(validateAll('1011054', 'US', 'Moscow', 'Orlova', '1')).toEqual([
      'Почтовый код страны должен быть формата NNNNN или NNNNN-NNNN',
    ])
  })
  test('Проверка на специальный символ или цифру в названии города', () => {
    expect(validateAll('101101', 'RU', 'Mo1scow!', 'Orlova', '1')).toEqual([
      'Название города содержит специсимволы',
      'Название города содержит цифру',
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
