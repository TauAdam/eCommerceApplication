interface ErrorProp {
  errorSource: string
  errors: string[]
}

type PropFunction = (address: IAddress) => void

interface AddressProp {
  addressType: string
  address: IAddress
  setAddress: PropFunction
}

enum AUTH_ACTION_TYPES {
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_PASSWORD_SUBMIT = 'SET_PASSWORD_SUBMIT',
  SET_EMAIL_ERRORS = 'SET_EMAIL_ERRORS',
  SET_PASSWORD_ERRORS = 'SET_PASSWORD_ERRORS',
  SET_SUBMIT_ERROR = 'SET_SUBMIT_ERROR',
  SET_PASSWORD_SHOW = 'SET_PASSWORD_SHOW',
  SET_BILLING_ADDRESS = 'SET_BILLING_ADDRESS',
  SET_SHIPPING_ADDRESS = 'SET_SHIPPING_ADDRESS',
}

type authActionType = {
  type: AUTH_ACTION_TYPES
  payload: string[] | string | boolean | IAddress
}

interface IAddress {
  country: string
  city: string
  streetName: string
  building: string
  apartment?: string
  asDefault: boolean
}

interface IAuthState {
  email: string
  password: string
  passwordSubmit: string
  emailErrors: string[]
  passwordErrors: string[]
  submitError: string
  showPassword: boolean
  billingAddress: IAddress
  shippingAddress: IAddress
}

export { ErrorProp, AddressProp, AUTH_ACTION_TYPES, authActionType, IAuthState, IAddress }
