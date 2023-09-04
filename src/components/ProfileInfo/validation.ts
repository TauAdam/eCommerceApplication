import { validateBirth, validateName } from 'components/SignUp/validatePersonal'
import { validateEmail } from 'components/share/validation'
import { CustomerActionValues } from './ProfileTypes'

export type ErrorsPersonal = Record<CustomerActionValues, string[]>

const initialErrorsPersonal: ErrorsPersonal = {
  email: [] as string[],
  firstName: [] as string[],
  lastName: [] as string[],
  dateOfBirth: [] as string[],
}

export function validatePersonal(
  event: React.ChangeEvent<HTMLInputElement>,
  key: CustomerActionValues
): string[] {
  const target = event.target as HTMLInputElement
  const root = target.parentElement?.parentElement as HTMLDivElement
  const [email, name, lastName, date] = root.querySelectorAll(
    '.field'
  ) as NodeListOf<HTMLInputElement>
  const errorsArray = { ...initialErrorsPersonal }
  errorsArray.email = validateEmail(email.value)
  errorsArray.firstName = validateName(name.value, 'Имя')
  errorsArray.lastName = validateName(lastName.value, 'Фамилия')
  errorsArray.dateOfBirth = validateBirth(date.value)

  return errorsArray[key]
}
