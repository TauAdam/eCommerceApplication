import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../share/login.css'
import {
  validateEmail,
  validatePassword,
  getSourceImage,
  getPasswordType,
  getInputStyle,
} from 'components/share/validation'
import { createCustomer } from 'utils/requests'
import ErrorMessage from 'components/share/errorMessage'

function SignUp() {
  const [emailErrors, setEmailErrors] = useState([] as string[])
  const [passwordErrors, setPasswordErrors] = useState([] as string[])
  const [signUpError, setSignUpError] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const passwordSubmitRef = useRef(null)

  const navigate = useNavigate()

  async function handleRegSubmit() {
    // диспатч({email, password})
    validateForm()
    // запрос
    //состояние обновляет
    //редирект
    if (emailErrors.length || passwordErrors.length) {
      return
    } else if (emailRef.current && passwordRef.current) {
      const emailInput = emailRef.current as HTMLInputElement
      const passwordInput = passwordRef.current as HTMLInputElement

      const email = emailInput.value
      const password = passwordInput.value

      try {
        const customer = await createCustomer(email, password)
        if (customer) {
          setSignUpError('')
          console.log('New customer\n', customer)
          navigate('/')
        }
      } catch (error) {
        if (error instanceof Error) {
          setSignUpError(error.message)
        }
      }
    }
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
        className={getInputStyle([...emailErrors, signUpError])}
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
          className={getInputStyle([...passwordErrors, signUpError])}
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
        className={getInputStyle([...passwordErrors, signUpError])}
        placeholder="Повторите пароль"
        ref={passwordSubmitRef}
        onChange={validateForm}
      ></input>
      {passwordErrors.length > 0 && (
        <ErrorMessage {...{ errorSource: 'Пароль', errors: passwordErrors }} />
      )}
      {signUpError && (
        <ErrorMessage {...{ errorSource: 'Ошибка регистрации', errors: [signUpError] }} />
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
