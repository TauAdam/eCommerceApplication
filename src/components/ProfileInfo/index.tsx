import React, { useEffect, useState, useCallback } from 'react'

import { getCustomer } from 'utils/requests'

import { initialProfileState } from './ProfileTypes'
import { handleAddressText } from './helpFunctions'

import Personal from './Personal'
import AddressInfo from './AddressInfo'
import AddressAdd from './AddressAdd'

import './style.css'

export default function ProfileInfo() {
  const [customerInfo, setCustomerInfo] = useState(initialProfileState)
  const [addAddress, setAddAddress] = useState(false)

  const getCustomerInfo = useCallback(async () => {
    const customerID = JSON.parse(localStorage.getItem('customer') || '').customer_id as string
    const data = await getCustomer(customerID)
    if (data) {
      console.log(data)
      setCustomerInfo(data)
      return data
    }
  }, [])

  useEffect(() => {
    getCustomerInfo()
  }, [getCustomerInfo])

  function showAddresses() {
    return customerInfo.addresses.map((value, index) => {
      if (value) {
        const id = index
        return <AddressInfo key={index} {...{ customerInfo, setCustomerInfo, id }} />
      }
    })
  }

  return (
    <div className="profile">
      <Personal {...{ customerInfo, setCustomerInfo }} />
      <h2 className="profile__title">Ваши адреса</h2>
      <section className="address__wrapper">
        {showAddresses()}
        {addAddress && <AddressAdd {...{ customerInfo, setCustomerInfo, setAddAddress }} />}
      </section>
      <div
        style={{ textAlign: 'center', cursor: 'pointer' }}
        onClick={() => {
          setAddAddress(!addAddress)
        }}
      >
        {handleAddressText(addAddress)}
      </div>
    </div>
  )
}
