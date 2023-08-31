import React, { useState } from 'react'
import { ICustomer } from './ProfileTypes'
import {
  showAddressInfo,
  showCountry,
  handleDefaultCheckbox,
  removeAddress,
  changeAddress,
  handleChekbox,
  setDisabledStyle,
} from './helpFunctions'
import editImg from '../../assets/images/edit.png'
import ErrorMessage from 'components/share/errorMessage'

type PropType = {
  customerInfo: ICustomer
  setCustomerInfo: (customer: ICustomer) => void
  id: number
}

export default function AddressInfo(props: PropType) {
  const [editMode, setEditMode] = useState(false)
  const [errors, setErrors] = useState([] as string[])

  const addresses = props.customerInfo.addresses

  let useBilling = false
  let useBillingDefault = false
  let useShipping = false
  let useShippingDefault = false
  if (addresses[props.id].id) {
    const id = addresses[props.id].id as string
    if (props.customerInfo.billingAddressIds.indexOf(id) !== -1) useBilling = true
    if (props.customerInfo.defaultBillingAddressId === id) useBillingDefault = true
    if (props.customerInfo.shippingAddressIds.indexOf(id) !== -1) useShipping = true
    if (props.customerInfo.defaultShippingAddressId === id) useShippingDefault = true
  }

  return (
    <>
      <div className="address__section" data-id={addresses[props.id].id}>
        <div
          className="address__edit-wrapper"
          onClick={() => {
            setEditMode(!editMode)
          }}
        >
          <span>Изменить</span>
          <img src={editImg} alt="edit address" className="address__edit" />
        </div>
        {showCountry(addresses[props.id].country, editMode, setErrors)}
        {showAddressInfo('Почтовый код', addresses[props.id].postalCode, editMode, setErrors)}
        {showAddressInfo('Город', addresses[props.id].city, editMode, setErrors)}
        {showAddressInfo('Улица', addresses[props.id].streetName, editMode, setErrors)}
        {showAddressInfo('Здание', addresses[props.id].building, editMode, setErrors)}
        {showAddressInfo('Квартира', addresses[props.id].apartment, editMode, setErrors)}
        <label className={setDisabledStyle(editMode)}>
          <input
            type="checkbox"
            name="billing"
            defaultChecked={useBilling}
            onChange={(event) => {
              handleChekbox(event, editMode)
            }}
          />
          &nbsp;адрес выставления счета
        </label>
        <br />
        <label className={setDisabledStyle(editMode)}>
          <input
            type="checkbox"
            name="billing"
            defaultChecked={useBillingDefault}
            onChange={(event) => {
              handleDefaultCheckbox(event, editMode)
            }}
          />
          &nbsp;адрес выставления счета по умолчанию
        </label>
        <br />
        <label className={setDisabledStyle(editMode)}>
          <input
            type="checkbox"
            name="shipping"
            defaultChecked={useShipping}
            onChange={(event) => {
              handleChekbox(event, editMode)
            }}
          />
          &nbsp;адрес доставки
        </label>
        <br />
        <label className={setDisabledStyle(editMode)}>
          <input
            type="checkbox"
            name="shipping"
            defaultChecked={useShippingDefault}
            onChange={(event) => {
              handleDefaultCheckbox(event, editMode)
            }}
          />
          &nbsp;адрес доставки по умолчанию
        </label>
        {editMode && (
          <button
            className="profile__button"
            onClick={(event) => {
              if (errors.length) return
              changeAddress(
                event,
                props.customerInfo.id,
                props.customerInfo.version || 1,
                props.setCustomerInfo,
                setEditMode
              )
            }}
          >
            Сохранить изменения
          </button>
        )}
        {!editMode && (
          <button
            className="profile__button"
            onClick={async (event) =>
              removeAddress(
                event,
                props.customerInfo.id,
                props.customerInfo.version || 1,
                props.setCustomerInfo
              )
            }
          >
            Удалить этот адрес
          </button>
        )}
        {errors.length > 0 && (
          <ErrorMessage {...{ errorSource: `Ошибка ввода адреса`, errors: errors }} />
        )}
      </div>
    </>
  )
}
