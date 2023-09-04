import React, { useState } from 'react'
import { ICustomer } from './ProfileTypes'
import { addAddress, showAddressInfo, showCountry } from './helpFunctions'

import ErrorMessage from 'components/share/errorMessage'

type PropType = {
  customerInfo: ICustomer
  setCustomerInfo: (customer: ICustomer) => void
  setAddAddress: (addAddress: boolean) => void
}

export default function AddressAdd(props: PropType) {
  const [errors, setErrors] = useState([] as string[])

  return (
    <>
      <div className="address__section">
        {showCountry('RU', true, setErrors)}
        {showAddressInfo('Почтовый код', '100000', true, setErrors)}
        {showAddressInfo('Город', '', true, setErrors)}
        {showAddressInfo('Улица', '', true, setErrors)}
        {showAddressInfo('Здание', '', true, setErrors)}
        {showAddressInfo('Квартира', '', true, setErrors)}
        <button
          className="profile__button"
          onClick={async (event) => {
            if (errors.length) return
            addAddress(
              event,
              props.customerInfo.id,
              props.customerInfo.version || 1,
              props.setCustomerInfo,
              props.setAddAddress
            )
          }}
        >
          Добавить адрес
        </button>
        {errors.length > 0 && (
          <ErrorMessage {...{ errorSource: `Ошибка ввода адреса`, errors: errors }} />
        )}
      </div>
    </>
  )
}
