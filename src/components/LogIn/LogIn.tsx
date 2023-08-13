import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../share/login.css'
import {
  validateEmail,
  validatePassword,
  showErrors,
  getSourceImage,
  getPasswordType,
} from 'components/share/validation'
import { loginCustomer } from 'utils/requests'

function LogIn() {
  const [emailErrors, setEmailErrors] = useState([] as string[])
  const [passwordErrors, setPasswordErrors] = useState([] as string[])
  const [isShowPassword, setIsShowPassword] = useState(false)

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  async function handleLoginSubmit() {
    validateForm()
    if (emailErrors.length || passwordErrors.length) {
      return
    } else if (emailRef.current && passwordRef.current) {
      const emailInput = emailRef.current as HTMLInputElement
      // const passwordInput = passwordRef.current as HTMLInputElement

      const email = emailInput.value
      // const password = passwordInput.value

      const results: Record<string, string>[] = await loginCustomer(email)
      results.forEach((customer, index) => console.log('Customer № ' + index + '\n', customer))
    }
  }

  function validateForm() {
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
        className="input"
        placeholder="Электронная почта"
        ref={emailRef}
        onChange={validateForm}
      ></input>
      {emailErrors.length > 0 && (
        <div className="errors">
          Электронная почта: <br />
          {showErrors(emailErrors)}
        </div>
      )}
      <div className="password-container">
        <input
          type={getPasswordType(isShowPassword)}
          className="input"
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
        <div className="errors">
          Пароль: <br />
          {showErrors(passwordErrors)}
        </div>
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
