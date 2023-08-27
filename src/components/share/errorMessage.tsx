import React from 'react'
import { showErrors } from './helpFunctions'
import errorImage from '../../assets/images/error.png'
import { ErrorProp } from './types'

export default function ErrorMessage(props: ErrorProp) {
  return (
    <div className="errors">
      <img src={errorImage} alt="error" className="error-image" />
      {props.errorSource} <br />
      {showErrors(props.errors)}
    </div>
  )
}
