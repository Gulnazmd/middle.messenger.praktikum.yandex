import authAPI from '../api/auth';
import  Screens from 'core/screens/screens';
import type { Dispatch } from 'core';
import { apiError } from '../utils/apiError';
import { transformUser } from '../utils/apiTransformers';
import { SignupFormData } from 'components/authForm/types/formData';
import { LoginPayload, SignupPayload } from './types/auth';

export const loginService = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: LoginPayload,
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.signin(action);

  if (apiError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.getUser();

  dispatch({ isLoading: false, loginFormError: '' });

  if (apiError(responseUser)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser) });

  window.router.go(Screens.ProfilePage);
};

export const signup = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: SignupFormData,
) => {
  dispatch({ isLoading: true });

  const mapFieldToApi = {
    email: 'email',
    login: 'login',
    firstName: 'first_name',
    secondName: 'second_name',
    password: 'password',
    phone: 'phone',
  };

  type SignupFormKeys = keyof (typeof mapFieldToApi);
  type SignupAPIKeys = keyof SignupPayload;

  const data: SignupPayload = {} as SignupPayload;

  Object.keys(mapFieldToApi).forEach((key: SignupFormKeys) => {
    data[mapFieldToApi[key] as SignupAPIKeys] = action[key];
  });

  const response = await authAPI.signup(data);

  if (apiError(response)) {
    dispatch({ isLoading: false, signupFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.getUser();

  dispatch({ isLoading: false, signupFormError: '' });

  if (apiError(responseUser)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser) });

  window.router.go(Screens.ProfilePage);
};

export const logout = async () => {
  await authAPI.logout();

  const currentRoute = window.router.getRoute(window.location.pathname);

  if (currentRoute?.match(Screens.Login) || currentRoute?.match(Screens.RegPage)) {
    return;
  }

  window.router.go(Screens.Login);
};