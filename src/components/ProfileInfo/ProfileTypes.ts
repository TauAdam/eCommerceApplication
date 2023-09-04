import { IAddress } from 'components/share/types'

const initialProfileState: ICustomer = {
  id: '',
  addresses: [],
  billingAddressIds: [],
  email: 'default@email.com',
  shippingAddressIds: [],
  defaultBillingAddressId: 'не указан',
  defaultShippingAddressId: 'не указан',
  firstName: 'не указано',
  lastName: 'не указано',
  dateOfBirth: 'не указано',
}

interface ICustomer {
  id: string
  addresses: IAddress[]
  billingAddressIds: string[]
  email: string
  shippingAddressIds: string[]
  defaultBillingAddressId?: string
  defaultShippingAddressId?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  version?: number
}

enum CustomerActionValues {
  email = 'email',
  firstName = 'firstName',
  lastName = 'lastName',
  dateOfBirth = 'dateOfBirth',
}

enum CustomerActions {
  email = 'changeEmail',
  firstName = 'setFirstName',
  lastName = 'setLastName',
  dateOfBirth = 'setDateOfBirth',
  addAddress = 'addAddress',
  removeAddress = 'removeAddress',
  changeAddress = 'changeAddress',
  addBillingAddressId = 'addBillingAddressId',
  removeBillingAddressId = 'removeBillingAddressId',
  addShippingAddressId = 'addShippingAddressId',
  removeShippingAddressId = 'removeShippingAddressId',
  setDefaultBillingAddress = 'setDefaultBillingAddress',
  setDefaultShippingAddress = 'setDefaultShippingAddress',
}

export { ICustomer, CustomerActions, CustomerActionValues, initialProfileState }
