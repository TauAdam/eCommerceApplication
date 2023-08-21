/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import { AddressProp } from './types'
import ErrorMessage from './errorMessage'
import './login.css'
import { getInputStyle } from './validation'

export default function Address(props: AddressProp) {
  const [def, setDef] = useState(false)
  const [errors, setErrors] = useState([] as string[])
  const country = useRef(null)
  const city = useRef(null)
  const street = useRef(null)
  const building = useRef(null)
  const apartment = useRef(null)

  useEffect(() => {
    setAddress()
  }, [def])

  function checkInputError(value: string, type: string, errors: string[]): string[] {
    const message = `Заполните поле "${type}"`
    if (value.length === 0) {
      return [...errors, message]
    } else {
      return errors
    }
  }

  function getInputValue(input: HTMLInputElement | null): string {
    if (input) return input.value
    return ''
  }

  function validate() {
    let errorsArray = []
    const countryValue = getInputValue(country.current)
    if (countryValue.length !== 2)
      errorsArray.push('Страна указывается в формате ISO_3166-1_alpha-2, например RU, EN, KZ...')
    errorsArray = checkInputError(getInputValue(city.current), 'Город', errorsArray)
    errorsArray = checkInputError(getInputValue(street.current), 'Улица', errorsArray)
    errorsArray = checkInputError(getInputValue(building.current), 'Здание', errorsArray)

    setErrors(errorsArray)
    if (errorsArray.length === 0) setAddress()
  }

  function setAddress() {
    if (errors.length) return
    if (
      country.current &&
      city.current &&
      street.current &&
      building.current &&
      apartment.current
    ) {
      props.setAddress({
        country: getInputValue(country.current),
        city: getInputValue(city.current),
        streetName: getInputValue(street.current),
        building: getInputValue(building.current),
        apartment: getInputValue(apartment.current),
        asDefault: def,
      })
    }
  }

  return (
    <>
      <h2 className="address-header">Адрес {props.addressType}:</h2>
      <label htmlFor={`${props.addressType}-asDefault`} className="address-label">
        Использовать адрес по умолчанию:&nbsp;&nbsp;
        <input
          type="checkbox"
          id={`${props.addressType}-asDefault`}
          checked={def}
          onChange={() => {
            setDef((prev) => !prev)
          }}
        />
      </label>
      <div className="address-container">
        <label className="input-label">
          <span>Страна (код)*</span>
          <input
            type="text"
            className={getInputStyle(errors)}
            ref={country}
            defaultValue={props.address.country}
            placeholder="Страна (код)*"
            onChange={validate}
          />
        </label>
        <label className="input-label">
          <span>Город*</span>
          <input
            type="text"
            className={getInputStyle(errors)}
            defaultValue={props.address.city}
            ref={city}
            placeholder="Город*"
            onChange={validate}
          />
        </label>
        <label className="input-label">
          <span>Улица*</span>
          <input
            type="text"
            className={getInputStyle(errors)}
            defaultValue={props.address.streetName}
            ref={street}
            placeholder="Улица*"
            onChange={validate}
          />
        </label>
        <label className="input-label">
          <span>Здание*</span>
          <input
            type="text"
            className={getInputStyle(errors)}
            defaultValue={props.address.building}
            ref={building}
            placeholder="Здание*"
            onChange={validate}
          />
        </label>
        <label className="input-label">
          <span>Квартира</span>
          <input
            type="text"
            className="input"
            ref={apartment}
            defaultValue={props.address.apartment}
            placeholder="Квартира"
          />
        </label>
      </div>
      {errors.length > 0 && (
        <ErrorMessage
          {...{ errorSource: `Ошибка ввода адреса ${props.addressType}`, errors: errors }}
        />
      )}
    </>
  )
}
