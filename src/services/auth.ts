import Screens from '../core/screens/screens';
import { SignupFormData } from '../components/authForm/types/formData';
import { apiError } from '../utils/apiError';
import { transformUser } from '../utils/apiTransformers';
import authAPI from '../api/auth';
import type { Dispatch } from '../core';
import { LoginPayload, SignupPayload } from './types/auth';
import { AppState } from '../types/appState';

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

  (<any>window).router.go(Screens.CHATSPAGE);
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

  const signupPayload: SignupPayload = {} as SignupPayload;

  Object.keys(mapFieldToApi).forEach((key: SignupFormKeys) => {
    signupPayload[mapFieldToApi[key] as SignupAPIKeys] = action[key];
  });

  const response = await authAPI.signup(signupPayload);

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

  (<any>window).router.go(Screens.PROFILEPAGE);
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  await authAPI.logout();

  const currentRoute = (<any>window).router.getRoute(window.location.pathname);

  if (currentRoute?.match(Screens.LOGIN) || currentRoute?.match(Screens.REGPAGE)) {
    return;
  }
  dispatch({ user: null });
  (<any>window).router.go(Screens.LOGIN);
};
