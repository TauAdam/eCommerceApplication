import React, { useState, useRef } from 'react'
import './Registration.css'

function Registration() {
  const [logIn, setLogIn] = useState(false)
  const [emailErrors, setEmailErrors] = useState([] as string[])
  const [passwordErrors, setPasswordErrors] = useState([] as string[])

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const passwordSubmitRef = useRef(null)

  function welcomeMessage() {
    if (logIn) return 'Вход в аккаунт'
    return 'Регистрация аккаунта'
  }

  function handleRegSubmit() {
    validateForm()
    // TODO: handle registration
  }

  function handleLoginSubmit() {
    validateForm()
    // TODO: handle logging
  }

  function showErrors(errors: string[]) {
    return (
      <ul>
        {errors.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ul>
    )
  }

  function validateEmail(email: string) {
    const emErrors: string[] = []
    const emailTemplate = /\w+@\w+(.com|.ru)/
    const domainTemplate = /.+(.com|.ru)/
    if (email.match(emailTemplate) === null) emErrors.push('должна быть формата "users@mail.com"')
    if (email.match(domainTemplate) === null)
      emErrors.push('должна содержать домен, например "...mail.com"')
    if (email.match('@') === null) emErrors.push('должна содержать разделитель"@"')
    if (email[0] === ' ' || email[email.length - 1] === ' ')
      emErrors.push('содержит пробелы в начале или конце строки')
    setEmailErrors(emErrors)
  }

  function validatePassword(password: string) {
    const passErrors: string[] = []
    const uppercaseLetter = /A-Z/
    const lowercaseLetter = /a-z/
    const digit = /\d/
    const specSymbol =
      /(\!|\"|\#|\$|\%|\&|\'|\(|\)|\*|\+|\,|\-|\.|\/|\:|\;|\<|\=|\>|\?|\@|\[|\\|\]|\^|\_|\`|\{|\||\}|\~)/

    if (password.length < 8) passErrors.push('должен быть не короче 8 символов')
    if (password.match(uppercaseLetter) === null)
      passErrors.push('должен содержать хотя бы одну заглавную букву A-Z')
    if (password.match(lowercaseLetter) === null)
      passErrors.push('должен содержать хотя бы одну маленькую букву a-z')
    if (password.match(digit) === null) passErrors.push('должен содержать хотя бы цифру')
    if (password.match(specSymbol) === null)
      passErrors.push('должен содержать хотя бы один специальный символ  # $ % &...')
    if (password[0] === ' ' || password[password.length - 1] === ' ')
      passErrors.push('содержит пробелы в начале или конце строки')

    if (passwordSubmitRef.current) {
      const passwordElement = passwordSubmitRef.current as HTMLInputElement
      const secondPassword: string = passwordElement.value
      if (password !== secondPassword) passErrors.push('пароли должны совпадать')
    }
    setPasswordErrors(passErrors)
  }

  function validateForm() {
    if (emailRef.current) {
      const emailInput = emailRef.current as HTMLInputElement
      const email = emailInput.value
      validateEmail(email)
    }
    if (passwordRef.current) {
      const passwordInput = passwordRef.current as HTMLInputElement
      const password = passwordInput.value
      validatePassword(password)
    }
  }

  return (
    <div id="registration" className="registration">
      <span className="welcome-text">{welcomeMessage()}</span>
      <input type="text" className="input" placeholder="Электронная почта" ref={emailRef}></input>
      {emailErrors.length > 0 && (
        <div className="errors">
          Электронная почта: <br />
          {showErrors(emailErrors)}
        </div>
      )}
      <input type="password" className="input" placeholder="Пароль" ref={passwordRef}></input>
      {!logIn && (
        <input
          type="password"
          className="input"
          placeholder="Подтвердите пароль"
          ref={passwordSubmitRef}
        ></input>
      )}
      {passwordErrors.length > 0 && (
        <div className="errors">
          Пароль: <br />
          {showErrors(passwordErrors)}
        </div>
      )}
      {logIn && (
        <button className="submit" onClick={handleLoginSubmit}>
          Вход
        </button>
      )}
      {!logIn && (
        <button className="submit" onClick={handleRegSubmit}>
          Регистрация
        </button>
      )}

      <p className="switch-message">
        {(function () {
          if (logIn) return 'Нет аккаунта? '
          return 'Есть аккаунт? '
        })()}
        <span
          className="switch-button"
          onClick={() => {
            setEmailErrors([])
            setPasswordErrors([])
            setLogIn(!logIn)
          }}
        >
          {(function () {
            if (logIn) return 'Зарегистрироваться'
            return 'Войти'
          })()}
        </span>
      </p>
    </div>
  )
}

export default Registration
