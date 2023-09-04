import React, { useState } from 'react'

import { changePassword, updateCustomer } from 'utils/requests'

import { CustomerActionValues, CustomerActions, ICustomer } from './ProfileTypes'
import { ChangeType } from 'components/share/types'

import { showDate, showInfo } from './helpFunctions'
import { validatePassword } from 'components/share/validation'

import editImg from '../../assets/images/edit.png'

import ErrorMessage from 'components/share/errorMessage'

type PropType = {
  customerInfo: ICustomer
  setCustomerInfo: (customer: ICustomer) => void
}

export default function Personal(props: PropType) {
  const [editMode, setEditMode] = useState(false)
  const [changes, setChanges] = useState([] as ChangeType[])
  const [toChangePassword, setToChangePassword] = useState(false)
  const [emailErrors, setEmailErrors] = useState([] as string[])
  const [firstNameErrors, setFirstNameErrors] = useState([] as string[])
  const [lastNameErrors, setLastNameErrors] = useState([] as string[])
  const [dateOfBirthErrors, setDateOfBirthErrors] = useState([] as string[])
  const [currentPasswordErrors, setCurrentPasswordErrors] = useState([] as string[])
  const [newPasswordErrors, setNewPasswordErrors] = useState([] as string[])

  return (
    <>
      <div className="title-wrapper">
        <h1 className="profile__title">Мой профиль</h1>
        <img
          src={editImg}
          alt="edit mode"
          className="title__image"
          onClick={() => {
            setEditMode(!editMode)
            setEmailErrors([])
            setFirstNameErrors([])
            setLastNameErrors([])
            setDateOfBirthErrors([])
          }}
        />
      </div>
      <div>
        {showInfo(
          'email',
          props.customerInfo.email,
          CustomerActions.email,
          CustomerActionValues.email,
          editMode,
          changes,
          setChanges,
          setEmailErrors,
          emailErrors.length
        )}
        {emailErrors.length > 0 && editMode && (
          <ErrorMessage {...{ errorSource: 'Ошибка ввода почты', errors: emailErrors }} />
        )}
        {showInfo(
          'Имя',
          props.customerInfo.firstName,
          CustomerActions.firstName,
          CustomerActionValues.firstName,
          editMode,
          changes,
          setChanges,
          setFirstNameErrors,
          firstNameErrors.length
        )}
        {firstNameErrors.length > 0 && editMode && (
          <ErrorMessage {...{ errorSource: 'Ошибка в поле "Имя"', errors: firstNameErrors }} />
        )}
        {showInfo(
          'Фамилия',
          props.customerInfo.lastName,
          CustomerActions.lastName,
          CustomerActionValues.lastName,
          editMode,
          changes,
          setChanges,
          setLastNameErrors,
          lastNameErrors.length
        )}
        {lastNameErrors.length > 0 && editMode && (
          <ErrorMessage {...{ errorSource: 'Ошибка в поле "Фамилия"', errors: lastNameErrors }} />
        )}
        {showDate(
          props.customerInfo.dateOfBirth,
          editMode,
          changes,
          setChanges,
          setDateOfBirthErrors
        )}
        {dateOfBirthErrors.length > 0 && editMode && (
          <ErrorMessage
            {...{ errorSource: 'Ошибка в поле "Дата рождения"', errors: dateOfBirthErrors }}
          />
        )}
        <button
          className="profile__button"
          onClick={async () => {
            if (
              !editMode ||
              emailErrors.length ||
              firstNameErrors.length ||
              lastNameErrors.length ||
              dateOfBirthErrors.length
            )
              return
            updateCustomer(props.customerInfo.id, props.customerInfo.version ?? 1, changes)
            setEditMode(false)
          }}
        >
          Сохранить изменения
        </button>
      </div>
      <div className="password-wrapper">
        {toChangePassword && (
          <>
            <hr />
            <input
              className="field"
              type="text"
              placeholder="Введите ваш пароль"
              id="current-password"
              onChange={(event) => {
                console.log(event.target.value)
                const errors = validatePassword(event.target.value)
                console.log(errors)
                setCurrentPasswordErrors(errors)
              }}
            />
            {currentPasswordErrors.length > 0 && (
              <ErrorMessage
                {...{
                  errorSource: 'Ошибка ввода текущего пароля',
                  errors: currentPasswordErrors,
                }}
              />
            )}
            <input
              className="field"
              type="text"
              placeholder="Введите новый пароль"
              id="new-password"
              onChange={(event) => {
                const errors = validatePassword(event.target.value)
                setNewPasswordErrors(errors)
              }}
            />
            {newPasswordErrors.length > 0 && (
              <ErrorMessage
                {...{
                  errorSource: 'Ошибка ввода нового пароля',
                  errors: newPasswordErrors,
                }}
              />
            )}
            <span
              className="password__button"
              onClick={async () => {
                if (currentPasswordErrors.length || newPasswordErrors.length) return
                const currPassRlement = document.getElementById(
                  'current-password'
                ) as HTMLInputElement
                const newPassElement = document.getElementById('new-password') as HTMLInputElement
                const currentPassword = currPassRlement.value
                const newPassword = newPassElement.value

                changePassword(
                  props.customerInfo.id,
                  props.customerInfo.version || 1,
                  currentPassword,
                  newPassword
                )
                setToChangePassword(!toChangePassword)
              }}
            >
              Сохранить пароль
            </span>
            <hr />
          </>
        )}
        {!toChangePassword && (
          <div
            className="password__button"
            onClick={() => {
              setToChangePassword(!toChangePassword)
            }}
          >
            Поменять пароль
          </div>
        )}
      </div>
    </>
  )
}
