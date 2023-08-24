/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import ErrorMessage from '../share/errorMessage'
import '../share/login.css'
import { getInputStyle } from '../share/validation'
import { validateAll } from './validatePersonal'
import { PersonalProp } from 'components/share/types'

export default function Personal(props: PersonalProp) {
  const [errors, setErrors] = useState([] as string[])

  return (
    <>
      <h2 className="address-header">Персональные данные:</h2>
      <div className="address-container">
        <label className="input-label">
          <span>Имя</span>
          <input
            type="text"
            className={getInputStyle(errors)}
            value={props.name}
            placeholder="Имя"
            onChange={(event) => {
              props.setName(event.target.value)
              const errors = validateAll(event.target.value, props.lastName, props.dateOfBirth)
              if (errors.length) {
                props.setComponentErrors(true)
              } else {
                props.setComponentErrors(false)
              }
              setErrors(errors)
            }}
          />
        </label>
        <label className="input-label">
          <span>Фамилия</span>
          <input
            type="text"
            className={getInputStyle(errors)}
            value={props.lastName}
            placeholder="Фамилия"
            onChange={(event) => {
              props.setLastName(event.target.value)
              const errors = validateAll(props.name, event.target.value, props.dateOfBirth)
              if (errors.length) {
                props.setComponentErrors(true)
              } else {
                props.setComponentErrors(false)
              }
              setErrors(errors)
            }}
          />
        </label>
        <label className="input-label">
          <span>Дата рождения</span>
          <input
            type="date"
            className={getInputStyle(errors)}
            value={props.dateOfBirth}
            placeholder="Дата рождения"
            onChange={(event) => {
              props.setDateOfBirth(event.target.value)
              const errors = validateAll(props.name, props.lastName, event.target.value)
              if (errors.length) {
                props.setComponentErrors(true)
              } else {
                props.setComponentErrors(false)
              }
              setErrors(errors)
            }}
          />
        </label>
      </div>
      {errors.length > 0 && (
        <ErrorMessage {...{ errorSource: `Ошибка ввода персональных данных`, errors: errors }} />
      )}
    </>
  )
}
