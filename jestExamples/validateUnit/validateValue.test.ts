import { describe, expect, test } from '@jest/globals'
import validateValue from './validateValue'

// это пример unit теста

describe('validateValue', () => {
  test('Корректное среднее значение', () => {
    expect(validateValue(50)).toBe(true)
    // ссылочные типы данных (объекты, массивы) проверяются на равенство с помощью toEqual
    // numbersToString([1, 2, 3]).toEqual(['1', '2', '3'])
  })
  test('Нижнее пороговое значение', () => {
    expect(validateValue(0)).toBe(true)
  })
  test('Верхнее пороговое значение', () => {
    expect(validateValue(100)).toBe(true)
  })
  test('Меньшее значение', () => {
    expect(validateValue(-1)).toBe(false)
  })
  test('Большее значение', () => {
    expect(validateValue(101)).toBe(false)
  })
})

// npm run test:jest ./jestExamples/validateValue.test.js
