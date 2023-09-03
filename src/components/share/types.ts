interface ErrorProp {
  errorSource: string
  errors: string[]
}

type AddressPropFunction = (address: IAddress) => void
type PersonalPropFunction = (data: string) => void
type ComponentErrorsFunction = (hasErrors: boolean) => void

interface AddressProp {
  addressType: string
  address: IAddress
  setAddress: AddressPropFunction
  setComponentErrors: ComponentErrorsFunction
}

interface PersonalProp {
  name: string
  setName: PersonalPropFunction
  lastName: string
  setLastName: PersonalPropFunction
  dateOfBirth: string
  setDateOfBirth: PersonalPropFunction
  setComponentErrors: ComponentErrorsFunction
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
  SET_NAME = 'SET_NAME',
  SET_LASTNAME = 'SET_LASTNAME',
  SET_BIRTH_DATE = 'SET_BIRTH_DATE',
}

type authActionType = {
  type: AUTH_ACTION_TYPES
  payload: string[] | string | boolean | IAddress
}

interface IAddress {
  id?: string
  country: string
  postalCode: string
  city: string
  streetName: string
  building: string
  apartment?: string
  asDefault?: boolean
}

interface IAuthState {
  email: string
  password: string
  passwordSubmit: string
  emailErrors: string[]
  passwordErrors: string[]
  submitError: string
  showPassword: boolean
  firstName: string
  lastName: string
  dateOfBirth: string
  billingAddress: IAddress
  shippingAddress: IAddress
}

type ChangeType = Record<string, string | IAddress>

enum ErrorMessages {
  hasDigit = 'содержит цифру',
  hasSymbol = 'содержит спецсимволы',
  birthDate = 'покупатель должен быть не младше 13 лет',
  emailFormat = 'должна быть формата "users@mail.com"',
  emailDomain = 'должна содержать домен, например "...mail.com"',
  emailDelimiter = 'должна содержать разделитель"@"',
  passwordLength = 'должен быть не короче 8 символов',
  passwordUpperCase = 'должен содержать хотя бы одну заглавную букву A-Z',
  passwordLowerCase = 'должен содержать хотя бы одну маленькую букву a-z',
  passwordDigit = 'должен содержать хотя бы одну цифру',
  passwordSymbol = 'должен содержать хотя бы один специальный символ',
  hasSpaces = 'содержит пробелы',
  passwordEqual = 'пароли должны совпадать',
  postalRU = 'почтовый код страны должен быть формата NNNNNN',
  postalUS = 'почтовый код страны должен быть формата NNNNN или NNNNN-NNNN',
}

export {
  ErrorProp,
  AddressProp,
  PersonalProp,
  AUTH_ACTION_TYPES,
  authActionType,
  IAuthState,
  IAddress,
  ChangeType,
  ErrorMessages,
}
