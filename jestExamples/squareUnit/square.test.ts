import { describe, expect, test, beforeEach, beforeAll, afterEach } from '@jest/globals'
import { jest } from '@jest/globals'
import square from './square'

describe('sqwuare', () => {
  // можно перед тестами проводить какие-то операции и объявлять переменные
  let mockValue: number = 0

  // функция будет вызвана перед каждым тестом
  beforeEach(() => {
    mockValue = Math.round(Math.random() * 100)
  })

  // функция будет вызвана перед тестами один раз
  beforeAll(() => {
    mockValue = Math.round(Math.random() * 100)
  })

  const spyMathPow = jest.spyOn(Math, 'pow')

  test('Корректное значение', () => {
    expect(square(mockValue)).toBe(mockValue * mockValue) // плохой пример, только ради beforeEach
    expect(square(mockValue)).toBeLessThan(10001)
    expect(square(mockValue)).toBeGreaterThan(-1)
    expect(square(mockValue)).not.toBeUndefined()
  })

  test('Проверка вызова метода pow при value = 2', () => {
    square(2)
    expect(spyMathPow).toBeCalledTimes(1)
  })

  test('Проверка вызова метода pow при value = 1', () => {
    square(1)
    expect(spyMathPow).toBeCalledTimes(0)
  })

  afterEach(() => {
    console.log('value was:', mockValue)
    // если создаются моки, их желательно чистить после тестов
    jest.clearAllMocks()
  })
})
