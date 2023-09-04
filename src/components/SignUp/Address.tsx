/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import { AddressProp } from '../share/types'

import { getInputStyle } from '../share/helpFunctions'
import { validateAll } from './validateAddress'

import ErrorMessage from '../share/errorMessage'

export default function Address(props: AddressProp) {
  const [def, setDef] = useState(false)
  const [errors, setErrors] = useState([] as string[])
  const [country, setCountry] = useState('US')
  const [city, setCity] = useState('New York')
  const [street, setStreet] = useState('Washington')
  const [building, setBuilding] = useState('1')
  const [apartment, setApartment] = useState('100')
  const [postalCode, setPostalCode] = useState('10000')

  useEffect(() => {
    setAddress(postalCode, country, city, street, building, apartment)
  }, [def])

  function setAddress(
    postalCode: string,
    country: string,
    city: string,
    street: string,
    building: string,
    apartment: string
  ) {
    props.setAddress({
      country: country,
      postalCode: postalCode,
      city: city,
      streetName: street,
      building: building,
      apartment: apartment,
      asDefault: def,
    })
  }

  function validate(
    postalCode: string,
    country: string,
    city: string,
    street: string,
    building: string,
    apartment: string
  ) {
    const errorsArray = validateAll(postalCode, country, city, street, building)
    setErrors(errorsArray)

    if (errorsArray.length) {
      props.setComponentErrors(true)
      return
    } else {
      props.setComponentErrors(false)
      setAddress(postalCode, country, city, street, building, apartment)
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
          <select
            name="country"
            className={getInputStyle(errors)}
            placeholder="Страна (код)*"
            onChange={(event) => {
              setCountry(event.target.value)
              validate(postalCode, event.target.value, city, street, building, apartment)
              console.log(event.target.value)
            }}
          >
            <option value="US" defaultChecked>
              United States
            </option>
            <option value="RU">Russian Federation</option>
            <option value="KZ">Kazakhstan</option>
          </select>
        </label>

        <label className="input-label">
          <span>Почтовый код*</span>
          <input
            type="text"
            className={getInputStyle(errors)}
            value={postalCode}
            placeholder="Почтовый код"
            onChange={(event) => {
              setPostalCode(event.target.value)
              validate(event.target.value, country, city, street, building, apartment)
            }}
          />
        </label>

        <label className="input-label">
          <span>Город*</span>
          <input
            type="text"
            className={getInputStyle(errors)}
            value={city}
            placeholder="Город*"
            onChange={(event) => {
              setCity(event.target.value)
              validate(postalCode, country, event.target.value, street, building, apartment)
            }}
          />
        </label>
        <label className="input-label">
          <span>Улица*</span>
          <input
            type="text"
            className={getInputStyle(errors)}
            value={street}
            placeholder="Улица*"
            onChange={(event) => {
              setStreet(event.target.value)
              validate(postalCode, country, city, event.target.value, building, apartment)
            }}
          />
        </label>
        <label className="input-label">
          <span>Здание*</span>
          <input
            type="text"
            className={getInputStyle(errors)}
            value={building}
            placeholder="Здание*"
            onChange={(event) => {
              setBuilding(event.target.value)
              validate(postalCode, country, city, street, event.target.value, apartment)
            }}
          />
        </label>
        <label className="input-label">
          <span>Квартира</span>
          <input
            type="text"
            className="input"
            value={apartment}
            placeholder="Квартира"
            onChange={(event) => {
              setApartment(event.target.value)
            }}
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
