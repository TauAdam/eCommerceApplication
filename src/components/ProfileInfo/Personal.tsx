import React, { useState } from 'react'
import ErrorMessage from 'components/share/errorMessage'

import { CustomerActionValues, CustomerActions, ICustomer } from './ProfileTypes'
import { ChangeType } from 'components/share/types'

import { showDate, showInfo } from './helpFunctions'
import { changePassword, updateCustomer } from 'utils/requests'

import editImg from '../../assets/images/edit.png'

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
          setEmailErrors
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
          setFirstNameErrors
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
          setLastNameErrors
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
            console.log(
              await updateCustomer(props.customerInfo.id, props.customerInfo.version ?? 1, changes)
            )
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
            />
            <input
              className="field"
              type="text"
              placeholder="Введите новый пароль"
              id="new-password"
            />
            <span
              className="password__button"
              onClick={async () => {
                const currPassRlement = document.getElementById(
                  'current-password'
                ) as HTMLInputElement
                const newPassElement = document.getElementById('new-password') as HTMLInputElement
                const currentPassword = currPassRlement.value
                const newPassword = newPassElement.value
                console.log(currentPassword, '\n', newPassword)
                console.log(
                  await changePassword(
                    props.customerInfo.id,
                    props.customerInfo.version || 1,
                    currentPassword,
                    newPassword
                  )
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
