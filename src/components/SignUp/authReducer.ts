import { IAuthState, authActionType, AUTH_ACTION_TYPES, IAddress } from 'components/share/types'
import { validateEmail, validatePassword } from 'components/share/validation'
import { ChangeEvent } from 'react'

const initialAddress: IAddress = {
  country: 'US',
  postalCode: '10000',
  city: 'New York',
  streetName: 'Ilon Mask',
  building: '1',
  apartment: '1',
  asDefault: true,
}

const initialState = {
  email: '1@2.com',
  password: 'QWEqwe1!',
  passwordSubmit: 'QWEqwe1!',
  emailErrors: [],
  passwordErrors: [],
  submitError: '',
  showPassword: false,
  firstName: 'John',
  lastName: 'Down',
  dateOfBirth: '2010-08-20',
  billingAddress: { ...initialAddress },
  shippingAddress: { ...initialAddress },
}

const initialLoginState = {
  email: '1@2.com',
  password: 'QWEqwe1!',
  emailErrors: [],
  passwordErrors: [],
  submitError: '',
  showPassword: false,
}

const reducer = (state: IAuthState, action: authActionType): IAuthState => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SET_EMAIL:
      return {
        ...state,
        email: action.payload as string,
      }
    case AUTH_ACTION_TYPES.SET_PASSWORD:
      return {
        ...state,
        password: action.payload as string,
      }
    case AUTH_ACTION_TYPES.SET_PASSWORD_SUBMIT:
      return {
        ...state,
        passwordSubmit: action.payload as string,
      }
    case AUTH_ACTION_TYPES.SET_EMAIL_ERRORS:
      return {
        ...state,
        emailErrors: action.payload as string[],
      }
    case AUTH_ACTION_TYPES.SET_PASSWORD_ERRORS:
      return {
        ...state,
        passwordErrors: action.payload as string[],
      }
    case AUTH_ACTION_TYPES.SET_PASSWORD_SHOW:
      return {
        ...state,
        showPassword: action.payload as boolean,
      }
    case AUTH_ACTION_TYPES.SET_SUBMIT_ERROR:
      return {
        ...state,
        submitError: action.payload as string,
      }
    case AUTH_ACTION_TYPES.SET_BILLING_ADDRESS:
      return {
        ...state,
        billingAddress: action.payload as IAddress,
      }
    case AUTH_ACTION_TYPES.SET_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload as IAddress,
      }
    case AUTH_ACTION_TYPES.SET_NAME:
      return {
        ...state,
        firstName: action.payload as string,
      }
    case AUTH_ACTION_TYPES.SET_LASTNAME:
      return {
        ...state,
        lastName: action.payload as string,
      }
    case AUTH_ACTION_TYPES.SET_BIRTH_DATE:
      return {
        ...state,
        dateOfBirth: action.payload as string,
      }
    default:
      return state
  }
}

class HandleAuthActions {
  private dispatch

  constructor(dispatch: React.Dispatch<authActionType>) {
    this.dispatch = dispatch
  }

  handleEmail(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    this.dispatch({
      type: AUTH_ACTION_TYPES.SET_EMAIL,
      payload: value,
    })

    const errors = validateEmail(value)
    this.setEmailErrors(errors)
  }

  handlePassword(event: ChangeEvent<HTMLInputElement>, secondPassword: string | undefined) {
    const value = event.target.value
    this.dispatch({
      type: AUTH_ACTION_TYPES.SET_PASSWORD,
      payload: value,
    })

    const errors = validatePassword(value, secondPassword)
    this.setPasswordErrors(errors)
  }

  setEmailErrors(errors: string[]) {
    this.dispatch({
      type: AUTH_ACTION_TYPES.SET_EMAIL_ERRORS,
      payload: errors,
    })
  }

  setPasswordErrors(errors: string[]) {
    this.dispatch({
      type: AUTH_ACTION_TYPES.SET_PASSWORD_ERRORS,
      payload: errors,
    })
  }

  setPasswordSubmit(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    this.dispatch({
      type: AUTH_ACTION_TYPES.SET_PASSWORD_SUBMIT,
      payload: value,
    })
  }

  setSubmitError(errors: string) {
    this.dispatch({
      type: AUTH_ACTION_TYPES.SET_SUBMIT_ERROR,
      payload: errors,
    })
  }

  setShowPassword(isShow: boolean) {
    this.dispatch({
      type: AUTH_ACTION_TYPES.SET_PASSWORD_SHOW,
      payload: !isShow,
    })
  }

  setBillingAddress(address: IAddress) {
    this.dispatch({
      type: AUTH_ACTION_TYPES.SET_BILLING_ADDRESS,
      payload: address,
    })
  }

  setShippingAddress(address: IAddress) {
    this.dispatch({
      type: AUTH_ACTION_TYPES.SET_SHIPPING_ADDRESS,
      payload: address,
    })
  }

  setName(name: string) {
    this.dispatch({
      type: AUTH_ACTION_TYPES.SET_NAME,
      payload: name,
    })
  }

  setLastName(lastName: string) {
    this.dispatch({
      type: AUTH_ACTION_TYPES.SET_LASTNAME,
      payload: lastName,
    })
  }

  setBirthDate(dateOfBirth: string) {
    this.dispatch({
      type: AUTH_ACTION_TYPES.SET_BIRTH_DATE,
      payload: dateOfBirth,
    })
  }
}

export { reducer, initialState, initialLoginState, initialAddress, HandleAuthActions }
