/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../share/login.css'
import { getSourceImage, getPasswordType, getInputStyle } from 'components/share/validation'
import { createCustomer, getCustomerToken, loginCustomer } from 'utils/requests'
import ErrorMessage from 'components/share/errorMessage'
import { HandleAuthActions, initialState, reducer } from '../share/authReducer'
import Address from 'components/share/Address'

function SignUp() {
  const [shipping, setShipping] = useState({ ...initialState.shippingAddress })
  const [billing, setBilling] = useState({ ...initialState.billingAddress })
  const [duplicateAddress, setDuplicateAddress] = useState(true)
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = new HandleAuthActions(dispatch)

  useEffect(() => {
    actions.setShippingAddress(shipping)
  }, [shipping])

  useEffect(() => {
    actions.setBillingAddress(billing)
  }, [billing])

  const navigate = useNavigate()

  async function handleRegSubmit() {
    if (state.emailErrors.length || state.passwordErrors.length) return
    try {
      const customer = await createCustomer(
        state.email,
        state.password,
        state.billingAddress,
        duplicateAddress ? state.billingAddress : state.shippingAddress
      )
      console.log('Created customer\n', customer)
      const customerId = await loginCustomer(state.email, state.password)
      const customerInfo = { ...(await getCustomerToken(state.email, state.password)) }
      customerInfo.customer_email = state.email
      customerInfo.customer_id = customerId
      localStorage.setItem('customer', JSON.stringify(customerInfo))

      actions.setSubmitError('')
      navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        actions.setSubmitError(error.message)
      }
    }
  }

  function validatePasswordSubmit(event: ChangeEvent<HTMLInputElement>, secondPassword: string) {
    const password = event.target.value
    const message = 'пароли должны совпадать'
    const index = state.passwordErrors.indexOf(message)
    if (password === secondPassword) {
      const errors = state.passwordErrors.filter((x) => x !== message)
      actions.setPasswordErrors(errors)
      return
    } else if (index === -1) {
      actions.setPasswordErrors([...state.passwordErrors, message])
    }
  }

  return (
    <div id="registration" className="registration">
      <span className="welcome-text">Регистрация аккаунта</span>
      <input
        type="text"
        className={getInputStyle([...state.emailErrors, state.submitError])}
        value={state.email}
        placeholder="Электронная почта"
        onChange={(event) => {
          actions.handleEmail(event)
        }}
      ></input>
      {state.emailErrors.length > 0 && (
        <ErrorMessage {...{ errorSource: 'Электронная почта', errors: state.emailErrors }} />
      )}
      <div className="password-container">
        <input
          type={getPasswordType(state.showPassword)}
          className={getInputStyle([...state.passwordErrors, state.submitError])}
          placeholder="Пароль"
          value={state.password}
          onChange={(event) => {
            actions.handlePassword(event, state.passwordSubmit)
          }}
        ></input>
        <img
          src={getSourceImage(state.showPassword)}
          alt="show hide password"
          className="password-vision"
          onClick={() => {
            actions.setShowPassword(state.showPassword)
          }}
        ></img>
      </div>
      <input
        type={getPasswordType(state.showPassword)}
        className={getInputStyle([...state.passwordErrors, state.submitError])}
        value={state.passwordSubmit}
        placeholder="Повторите пароль"
        onChange={(event) => {
          actions.setPasswordSubmit(event)
          validatePasswordSubmit(event, state.password)
        }}
      ></input>
      {state.passwordErrors.length > 0 && (
        <ErrorMessage {...{ errorSource: 'Пароль', errors: state.passwordErrors }} />
      )}
      {state.submitError && (
        <ErrorMessage {...{ errorSource: 'Ошибка регистрации', errors: [state.submitError] }} />
      )}

      <Address
        {...{
          addressType: 'для выставления счета',
          address: billing,
          setAddress: setBilling,
        }}
      />
      <label className="address-label" style={{ margin: '1.25rem auto' }}>
        <strong>Использовать как адрес для доставки&nbsp;&nbsp;</strong>
        <input
          type="checkbox"
          defaultChecked={duplicateAddress}
          onChange={() => {
            setDuplicateAddress(!duplicateAddress)
          }}
        />
      </label>
      {!duplicateAddress && (
        <Address
          {...{
            addressType: 'доставки',
            address: shipping,
            setAddress: setShipping,
          }}
        />
      )}
      <button className="submit" onClick={handleRegSubmit}>
        Регистрация
      </button>

      <p className="switch-message">
        Есть аккаунт?&nbsp;
        <Link to="/login">
          <span className="switch-button">Войти</span>
        </Link>
      </p>
    </div>
  )
}

export default SignUp
