import { ChangeType, IAddress } from 'components/share/types'
import React from 'react'
import { CustomerActionValues, CustomerActions, ICustomer } from './ProfileTypes'
import { updateCustomer } from 'utils/requests'
import { validateAll } from 'components/SignUp/validateAddress'
import { validatePersonal } from './validation'

export const handleDefaultCheckbox = (
  event: React.ChangeEvent<HTMLInputElement>,
  isEdit: boolean
) => {
  const target = event.target as HTMLInputElement
  if (isEdit === false) {
    target.checked = !target.checked
    return
  }
  if (target.checked) {
    const prevCheckbox = target.parentElement?.previousElementSibling?.previousElementSibling
      ?.children[0] as HTMLInputElement
    prevCheckbox.checked = true
  }
}

export const handleChekbox = (event: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
  const target = event.target as HTMLInputElement
  if (isEdit === false) {
    target.checked = !target.checked
  } else {
    return
  }
}

const hasErrors = (errorsLength: number) => (errorsLength ? 'field field-error' : 'field')

export function showInfo(
  key: string,
  value: string = 'не указано',
  action: CustomerActions,
  actionVal: CustomerActionValues,
  editMode: boolean,
  changes: ChangeType[],
  setChangesCallback: (arg: ChangeType[]) => void,
  errorCallback: (arg: string[]) => void,
  errorsLength: number = 0
) {
  return (
    <div className="field-wrapper">
      <span>{key}:</span>
      {editMode && (
        <input
          className={hasErrors(errorsLength)}
          type="text"
          placeholder={key}
          data-type={key}
          defaultValue={value}
          onChange={(event) => {
            const errors = validatePersonal(event, actionVal)
            errorCallback(errors)
            setChangesCallback(handleChange(changes, action, actionVal, event.target.value))
          }}
        ></input>
      )}
      {!editMode && (
        <div className="field" data-type={key}>
          {value}
        </div>
      )}
    </div>
  )
}

export function showDate(
  value: string = '2000-01-01',
  editMode: boolean,
  changes: ChangeType[],
  setChangesCallback: (arg: ChangeType[]) => void,
  errorCallback: (arg: string[]) => void
) {
  return (
    <div className="field-wrapper">
      <span>Дата рождения:</span>
      {editMode && (
        <input
          className="field"
          type="date"
          data-type="Дата"
          defaultValue={value}
          onChange={(event) => {
            const errors = validatePersonal(event, CustomerActionValues.dateOfBirth)
            errorCallback(errors)
            setChangesCallback(
              handleChange(
                changes,
                CustomerActions.dateOfBirth,
                CustomerActionValues.dateOfBirth,
                event.target.value
              )
            )
          }}
        ></input>
      )}
      {!editMode && (
        <div className="field" data-type="Дата">
          {value}
        </div>
      )}
    </div>
  )
}

export const setDisabledStyle = (isEdit: boolean) => (isEdit ? 'active' : '')

export function handleChange(
  changes: ChangeType[],
  myAction: CustomerActions,
  actionVal: CustomerActionValues,
  value: string | IAddress
) {
  let changesArray = [...changes]
  const toUpdateAction = changesArray.find((x) => x.action === myAction)

  if (toUpdateAction) {
    toUpdateAction[`${actionVal}`] = value
  } else {
    const addUpdate: ChangeType = { action: myAction }
    addUpdate[`${actionVal}`] = value
    changesArray = [...changesArray, addUpdate]
  }

  return changesArray
}

function addressValidation(
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  errorsCallback: (array: string[]) => void
) {
  const target = event.target as HTMLInputElement
  const root = target.parentElement?.parentElement as HTMLDivElement
  const [country, postal, city, street, building] = root.querySelectorAll('.field') as NodeListOf<
    HTMLInputElement | HTMLSelectElement
  >
  const errorsArray = validateAll(
    postal.value,
    country.value,
    city.value,
    street.value,
    building.value
  )
  errorsCallback(errorsArray)
}

export function showAddressInfo(
  key: string,
  value: string = 'не указано',
  editMode: boolean,
  errorsCallback: (array: string[]) => void
) {
  return (
    <div className="field-wrapper">
      <span>{key}:</span>
      {editMode && (
        <input
          className="field"
          type="text"
          data-type={key}
          defaultValue={value}
          onChange={(event) => {
            addressValidation(event, errorsCallback)
          }}
        ></input>
      )}
      {!editMode && (
        <div className="field" data-type={key}>
          {value}
        </div>
      )}
    </div>
  )
}

export function showCountry(
  value: string,
  editMode: boolean,
  errorsCallback: (array: string[]) => void
) {
  return (
    <div className="field-wrapper">
      <span>Страна:</span>
      {editMode && (
        <select
          className="field"
          data-type="Страна"
          defaultValue={value}
          onChange={(event) => {
            addressValidation(event, errorsCallback)
          }}
        >
          <option value="US">United States</option>
          <option value="RU">Russian Federation</option>
          <option value="KZ">Kazakhstan</option>
        </select>
      )}
      {!editMode && (
        <div className="field" data-type="Страна">
          {value}
        </div>
      )}
    </div>
  )
}

export const handleAddressText = (isAdd: boolean) => (isAdd ? 'отменить' : 'добавить адрес')

export async function removeAddress(
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  customerId: string,
  version: number,
  callback: (customer: ICustomer) => void
): Promise<void> {
  const target = event.target as HTMLButtonElement
  const id = target.parentElement?.getAttribute('data-id')
  if (id) {
    const action: ChangeType = {
      action: 'removeAddress',
      addressId: id,
    }
    const response = await updateCustomer(customerId, version, [action])
    if (response) callback(response)
  }
}

function getAddressValues(root: HTMLDivElement): IAddress {
  const [country, postal, city, street, building, apartment] = root.querySelectorAll(
    '.field'
  ) as NodeListOf<HTMLInputElement | HTMLSelectElement>
  return {
    country: country.value,
    postalCode: postal.value,
    city: city.value,
    streetName: street.value,
    building: building.value,
    apartment: apartment.value,
  }
}

export async function addAddress(
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  id: string,
  version: number,
  customerCallback: (customer: ICustomer) => void,
  addressCallback: (addAddress: boolean) => void
) {
  const target = event.target as HTMLButtonElement
  const root = target.parentElement as HTMLDivElement
  const action: ChangeType = {
    action: 'addAddress',
    address: getAddressValues(root),
  }
  const response = await updateCustomer(id, version, [action])
  if (response) {
    console.log(response)
    customerCallback(response)
    addressCallback(false)
  }
}

export async function changeAddress(
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  id: string,
  version: number,
  customerCallback: (customer: ICustomer) => void,
  editCallback: (edit: boolean) => void
) {
  const target = event.target as HTMLButtonElement
  const root = target.parentElement as HTMLDivElement
  const rootId = root.getAttribute('data-id') || ''
  const [billingEl, billingDefaultEl, shippingEl, shippingDefaultEl] = root.querySelectorAll(
    'label input'
  ) as NodeListOf<HTMLInputElement>
  const actions: ChangeType[] = setShippingBilling(
    rootId,
    billingEl.checked,
    billingDefaultEl.checked,
    shippingEl.checked,
    shippingDefaultEl.checked
  )
  actions.push({
    action: 'changeAddress',
    addressId: rootId,
    address: getAddressValues(root),
  })

  const response = await updateCustomer(id, version, actions)
  if (response) {
    console.log(response)
    customerCallback(response)
    editCallback(false)
  }
}

function setShippingBilling(
  addressId: string,
  isBilling: boolean,
  isBillingDefault: boolean,
  isShipping: boolean,
  isShippingDefault: boolean
): ChangeType[] {
  const actions: ChangeType[] = []
  if (isBilling) {
    actions.push({
      action: CustomerActions.addBillingAddressId,
      addressId,
    })
  } else {
    actions.push({
      action: CustomerActions.removeBillingAddressId,
      addressId,
    })
  }
  if (isShipping) {
    actions.push({
      action: CustomerActions.addShippingAddressId,
      addressId,
    })
  } else {
    actions.push({
      action: CustomerActions.addShippingAddressId,
      addressId,
    })
  }
  if (isBillingDefault) {
    actions.push({
      action: CustomerActions.setDefaultBillingAddress,
      addressId,
    })
  }
  if (isShippingDefault) {
    actions.push({
      action: CustomerActions.setDefaultShippingAddress,
      addressId,
    })
  }
  return actions
}
