import { InputType } from 'components/input/types';

type InputVariants = 'login';

export interface UserProfileFormData {
  email: string,
  login: string,
  firstName: string,
  secondName: string,
  displayName: string,
  phone: string,
}

export interface UserPasswordChangeFormData {
  oldPassword: string,
  newPassword: string,
  repeatPassword: string,
}

export interface IFormInputData {
  name: InputVariants,
  type: InputType,
  label: string,
  value: string,
  invalid: boolean,
  errors?: {
    dependentField: string,
  }
}
