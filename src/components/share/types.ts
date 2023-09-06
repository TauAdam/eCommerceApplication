import { Attribute, Price } from '@commercetools/platform-sdk'

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

enum CategoryID {
  bottomsWomen = '073218e8-8405-4757-8eea-e3459bd8dd95',
  topsWomen = '923ccd73-0b4b-4c33-85cc-577c2421a4ac',
  otherWomen = 'eb5e2629-13ed-464c-866b-d58ff9c3e7de',
  women = '93be046b-b950-4016-828e-53bb1d2ee8cd',
  bottomsMen = 'abb8c1ff-7971-4725-b8d1-37a93ddc8798',
  topsMen = 'a3a8856a-4812-408c-adc0-1c4e7ff6d9c1',
  otherMen = '071da2cc-06bd-4f46-bf13-e1bd97b4d19a',
  men = '8f24ebd0-f217-4564-95d3-c221d49df3c4',
  clothingKids = 'ede97e13-2c69-4ee5-8a11-71a2dc2c599e',
  bottomsKids = '6c179656-3eb9-4bb1-932e-56b5accda0f1',
  topsKids = 'fcdb822f-3907-4e0d-9aca-77b17c22f82c',
  otherKids = 'c1d44932-1749-4996-87bc-d2c03828b3f8',
  kids = '109398d0-4d73-4ba9-9471-37bfdd3d8980',
}

type UpdateCategory = {
  typeId: 'category'
  id: CategoryID
}

type ChangeType = Record<string, string | IAddress | UpdateCategory | Record<string, string>>

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

interface IProduct {
  name: string
  images: string[]
  description?: string
  id: string
  prices?: Price[]
  attributes?: Attribute[]
}

interface ICategory {
  typeId: 'category'
  id: string
}

interface IProductCategory {
  masterData: {
    current: {
      categories: ICategory[]
    }
  }
}

type Products = {
  results: IProductCategory[]
}

export {
  AUTH_ACTION_TYPES,
  AddressProp,
  ErrorProp,
  IAddress,
  IAuthState,
  IProduct,
  Products,
  PersonalProp,
  authActionType,
  ChangeType,
  ErrorMessages,
  CategoryID,
}
