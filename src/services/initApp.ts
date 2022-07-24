import { UserDTO } from '../api/types/userTypes';
import { transformUser } from '../utils/apiTransformers';
import authAPI from '../api/auth';
import { apiError } from '../utils/apiError';
import type { Dispatch } from '../core';
import type { AppState } from '../types/appState';

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const response = await authAPI.getUser();

    if (apiError(response)) {
      return;
    }
    dispatch({ user: transformUser(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
