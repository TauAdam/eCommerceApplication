import React from 'react'
import { ErrorProp } from './types'
import { showErrors } from './helpFunctions'
import imageError from '../../assets/images/error.png'
import './errorMessage.css'

export default function ErrorMessage(props: ErrorProp) {
  return (
    <div className="errors">
      <img src={imageError} alt="error" className="error-image" />
      <span>{props.errorSource}</span> <br />
      {showErrors(props.errors)}
    </div>
  )
}
