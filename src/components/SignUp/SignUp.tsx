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

function SignUp() {
  const [emailErrors, setEmailErrors] = useState([] as string[])
  const [passwordErrors, setPasswordErrors] = useState([] as string[])
  const [isShowPassword, setIsShowPassword] = useState(false)

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const passwordSubmitRef = useRef(null)

  function handleRegSubmit() {
    validateForm()
    // TODO: handle registration
  }

  function validateForm() {
    if (emailRef.current) {
      const emailInput = emailRef.current as HTMLInputElement
      const email = emailInput.value
      setEmailErrors(validateEmail(email))
    }
    if (passwordRef.current && passwordSubmitRef.current) {
      const passwordInput = passwordRef.current as HTMLInputElement
      const secondPasswordInput = passwordSubmitRef.current as HTMLInputElement
      const password: string = passwordInput.value
      const secondPassword: string = secondPasswordInput.value
      const passErrors = validatePassword(password)
      if (password !== secondPassword) passErrors.push('пароли должны совпадать')
      setPasswordErrors(passErrors)
    }
  }

  return (
    <div id="registration" className="registration">
      <span className="welcome-text">Регистрация аккаунта</span>
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
      <input
        type={getPasswordType(isShowPassword)}
        className="input"
        placeholder="Повторите пароль"
        ref={passwordSubmitRef}
        onChange={validateForm}
      ></input>
      {passwordErrors.length > 0 && (
        <div className="errors">
          Пароль: <br />
          {showErrors(passwordErrors)}
        </div>
      )}
      <button className="submit" onClick={handleRegSubmit}>
        Регистрация
      </button>

      <p className="switch-message">
        Есть аккаунт?&nbsp;
        <Link to="/login">
          <span
            className="switch-button"
            onClick={() => {
              setEmailErrors([])
              setPasswordErrors([])
            }}
          >
            Войти
          </span>
        </Link>
      </p>
    </div>
  )
}

export default SignUp
