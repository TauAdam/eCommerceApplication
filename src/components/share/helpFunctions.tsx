import show from '../../assets/images/password-show.png'
import hide from '../../assets/images/password-hide.png'
import React from 'react'

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
  if (hasErrors) {
    return 'input input-error'
  } else {
    return 'input'
  }
}

function getSourceImage(isShow: boolean) {
  if (isShow) {
    return show
  } else {
    return hide
  }
}

function getPasswordType(isShow: boolean) {
  if (isShow) {
    return 'text'
  } else {
    return 'password'
  }
}

export { showErrors, getSourceImage, getPasswordType, getInputStyle }
