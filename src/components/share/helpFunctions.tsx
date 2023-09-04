import React from 'react'
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

export { showErrors, getSourceImage, getPasswordType, getInputStyle }
