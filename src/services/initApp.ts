import type { Dispatch } from 'core';
import { UserDTO } from 'api/types/types';
import { transformUser } from 'utils/apiTransformers';
import authAPI from 'api/auth';
import { apiError } from 'utils/apiError';

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
