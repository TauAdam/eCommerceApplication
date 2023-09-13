import React from 'react'
import { getCustomerToken } from 'utils/requests'
import show from '../../assets/images/password-show.png'
import hide from '../../assets/images/password-hide.png'

function showErrors(errors: string[]) {
  return (
    <ul>
      {errors.map((el, index) => (
        <li key={index}>{el}</li>
      ))}
    </ul>
  )
}

function getInputStyle(errors: string[]) {
  let hasErrors = false
  for (let i = 0; i < errors.length; i++) {
    if (errors[i]) hasErrors = true
  }
  return hasErrors ? 'input input-error' : 'input'
}

const getSourceImage = (isShow: boolean) => (isShow ? show : hide)
const getPasswordType = (isShow: boolean) => (isShow ? 'text' : 'password')

const setCustomerToLocalStorage = async (email: string, password: string, id: string) => {
  const customerInfo = { ...(await getCustomerToken(email, password)) }
  customerInfo.customer_email = email
  customerInfo.customer_id = id
  customerInfo.token_date = new Date().getTime()
  localStorage.setItem('customer', JSON.stringify(customerInfo))
}

export { showErrors, getSourceImage, getPasswordType, getInputStyle, setCustomerToLocalStorage }
