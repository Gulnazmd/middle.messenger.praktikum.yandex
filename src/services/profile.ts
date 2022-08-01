import { UserProfileFormData, UserPasswordChangeFormData } from 'components/profileForm/types/profileFormProps';
import type { Dispatch } from 'core';
import { AppState } from 'types/appState';
import { apiError } from '../utils/apiError';
import authAPI from '../api/auth';
import { transformUser } from '../utils/apiTransformers';
import userAPI from '../api/user';
import { ChangeUserProfilePayload, ChangeUserPasswordPayload } from './types/user';
import { logout } from './auth';

export const getUser = async (
  dispatch: Dispatch<AppState>,
) => {
  dispatch({ isLoading: true });

  const responseUser = await authAPI.getUser();

  dispatch({ isLoading: false });

  if (apiError(responseUser)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser) });
};

export const changeUserProfile = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: UserProfileFormData,
) => {
  dispatch({ isLoading: true });

  const mapFieldToApi = {
    email: 'email',
    login: 'login',
    firstName: 'first_name',
    secondName: 'second_name',
    displayName: 'display_name',
    phone: 'phone',
  };

  type UserProfileFormKeys = keyof (typeof mapFieldToApi);
  type UserProfileAPIKeys = keyof ChangeUserProfilePayload;

  const userData: ChangeUserProfilePayload = {} as ChangeUserProfilePayload;

  Object.keys(mapFieldToApi).forEach((key: UserProfileFormKeys) => {
    userData[mapFieldToApi[key] as UserProfileAPIKeys] = action[key];
  });

  const response = await userAPI.changeUserProfile(userData);

  dispatch({ isLoading: false });

  if (apiError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(response) });
};

export const changePassword = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: UserPasswordChangeFormData,
) => {
  dispatch({ isLoading: true });

  const mapFieldToApi = {
    oldPassword: 'oldPassword',
    newPassword: 'newPassword',
  };

  type UserPasswordChangeFormKeys = keyof (typeof mapFieldToApi);
  type UserPasswordChangeAPIKeys = keyof ChangeUserPasswordPayload;

  const passwordData: ChangeUserPasswordPayload = {} as ChangeUserPasswordPayload;

  Object.keys(mapFieldToApi).forEach((key: UserPasswordChangeFormKeys) => {
    passwordData[mapFieldToApi[key] as UserPasswordChangeAPIKeys] = action[key];
  });

  const response = await userAPI.changeUserPassword(passwordData);

  dispatch({ isLoading: false });

  if (apiError(response)) {
    dispatch(logout);
  }
};

export const changeAvatar = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: { avatar: FormData },
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.changeAvatar(action);

  dispatch({ isLoading: false, user: transformUser(response) });
};
