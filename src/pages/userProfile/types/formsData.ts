import IFormData from './formData';

const userInfoFormData: IFormData[] = [
  {
    name: 'email',
    id: 'user-info-form__email',
    label: 'Почта',
  },
  {
    name: 'login',
    id: 'user-info-form__login',
    label: 'Логин',
  },
  {
    name: 'firstName',
    api: 'first_name',
    id: 'user-info-form__first-name',
    label: 'Имя',
  },
  {
    name: 'secondName',
    api: 'second_name',
    id: 'user-info-form__second-name',
    label: 'Фамилия',
  },
  {
    name: 'displayName',
    id: 'user-info-form__display-name',
    label: 'Имя в чате',
  },
  {
    name: 'phone',
    id: 'user-info-form__phone',
    label: 'Телефон',
  },
];

const passwordChangeFormData: IFormData[] = [
  {
    name: 'oldPassword',
    label: 'Старый пароль',
    type: 'password',
  },
  {
    name: 'newPassword',
    label: 'Новый пароль',
    type: 'password',
    errors: {
      dependentField: 'repeatPassword',
    },
  },
  {
    name: 'repeatPassword',
    label: 'Повторите новый пароль',
    type: 'password',
    errors: {
      dependentField: 'newPassword',
    },
  },
];

export {
  passwordChangeFormData,
  userInfoFormData,
};
