import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getCustomerToken, loginCustomer } from 'utils/requests'

import { getSourceImage, getPasswordType, getInputStyle } from 'components/share/helpFunctions'
import { validateEmail, validatePassword } from 'components/share/validation'

import ErrorMessage from 'components/share/errorMessage'

function LogIn() {
  const [emailErrors, setEmailErrors] = useState([] as string[])
  const [passwordErrors, setPasswordErrors] = useState([] as string[])
  const [loginError, setLoginError] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const navigate = useNavigate()

  async function handleLoginSubmit() {
    validateForm()
    if (emailErrors.length || passwordErrors.length) {
      return
    } else if (emailRef.current && passwordRef.current) {
      const emailInput = emailRef.current as HTMLInputElement
      const passwordInput = passwordRef.current as HTMLInputElement

      const email = emailInput.value
      const password = passwordInput.value

      const customerId: string | null = await loginCustomer(email, password)

      if (customerId) {
        setLoginError('')
        const customerInfo = { ...(await getCustomerToken(email, password)) }
        customerInfo.customer_email = email
        customerInfo.customer_id = customerId
        localStorage.setItem('customer', JSON.stringify(customerInfo))
        navigate('/')
      } else {
        setLoginError('Что-то пошло не так, проверьте правильность почты и пароля!')
      }
    }
  }

  function validateForm() {
    setLoginError('')
    if (emailRef.current) {
      const emailInput = emailRef.current as HTMLInputElement
      const email = emailInput.value
      setEmailErrors(validateEmail(email))
    }
    if (passwordRef.current) {
      const passwordInput = passwordRef.current as HTMLInputElement
      const password: string = passwordInput.value
      setPasswordErrors(validatePassword(password))
    }
  }

  return (
    <div id="registration" className="registration">
      <span className="welcome-text">Войти в аккаунт</span>
      <input
        type="text"
        className={getInputStyle([...emailErrors, loginError])}
        placeholder="Электронная почта"
        ref={emailRef}
        onChange={validateForm}
      ></input>
      {emailErrors.length > 0 && (
        <ErrorMessage {...{ errorSource: 'Электронная почта', errors: emailErrors }} />
      )}
      <div className="password-container">
        <input
          type={getPasswordType(isShowPassword)}
          className={getInputStyle([...passwordErrors, loginError])}
          placeholder="Пароль"
          ref={passwordRef}
          onChange={validateForm}
        ></input>
        <img
          src={getSourceImage(isShowPassword)}
          alt="show hide password"
          className="password-vision"
          onClick={() => {
            setIsShowPassword(!isShowPassword)
          }}
        ></img>
      </div>
      {passwordErrors.length > 0 && (
        <ErrorMessage {...{ errorSource: 'Пароль', errors: passwordErrors }} />
      )}
      {loginError && (
        <ErrorMessage {...{ errorSource: 'Ошибка авторизации', errors: [loginError] }} />
      )}
      <button className="submit" onClick={handleLoginSubmit}>
        Вход
      </button>

      <p className="switch-message">
        Нет аккаунта?&nbsp;
        <Link to="/signup">
          <span
            className="switch-button"
            onClick={() => {
              setEmailErrors([])
              setPasswordErrors([])
            }}
          >
            Зарегистрироваться
          </span>
        </Link>
      </p>
    </div>
  )
}

export default LogIn
