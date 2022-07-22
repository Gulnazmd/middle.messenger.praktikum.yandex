import { apiError } from 'utils/apiError';
import { transformChats, transformUser } from 'utils/apiTransformers';
import chatsAPI from 'api/chats';
import userAPI from 'api/user';
import type { Dispatch } from '../core';
import { logout } from './auth';

export const getChats = async (
  dispatch: Dispatch<AppState>,
) => {
  dispatch({ isLoading: true });

  const response = await chatsAPI.get();

  dispatch({ isLoading: false });

  if (apiError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ chats: transformChats(response) });
};

export const createChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: { title: string },
) => {
  dispatch({ isLoading: true });

  const response = await chatsAPI.createChat(action);

  dispatch({ isLoading: false });

  if (apiError(response)) {
    dispatch(logout);
    return;
  }

  dispatch(getChats);
};

export const deleteChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: { chatId: number },
) => {
  dispatch({ isLoading: true });

  const response = await chatsAPI.deleteChat(action);

  dispatch({ isLoading: false });

  if (!apiError(response)) {
    dispatch(getChats);
  }
};

export const deleteUserFromChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: { users: number[], chatId: number },
) => {
  dispatch({ isLoading: true });

  const response = await chatsAPI.deleteUsersFromChat(action);

  if (apiError(response)) {
    dispatch({
      isLoading: false,
      deleteUserError: response.reason,
    });
  }

  dispatch({ isLoading: false });
  dispatch(getChats);
  dispatch(getChatUsers, { chatId: action.chatId });
};

export const addUserToChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: { users: number[], chatId: number },
) => {
  dispatch({ isLoading: true });

  const response = await chatsAPI.addUsersToChat(action);

  if (apiError(response)) {
    dispatch({
      isLoading: false,
      addUserError: response.reason,
    });
  }

  dispatch({ isLoading: false });
  dispatch(getChats);
  dispatch(getChatUsers, { chatId: action.chatId });
};

export const searchUser = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: { login: string, chatId: number },
) => {
  dispatch({ isLoading: true });

  const userResult = await userAPI.findUserByLogin({ login: action.login });

  if (apiError(userResult)) {
    dispatch({
      isLoading: false,
      addUserError: userResult.reason,
    });
    return;
  }

  dispatch({
    isLoading: false,
    searchResult: userResult.map((user) => transformUser(user)),
  });
};

export const getChatUsers = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: { chatId: number },
) => {
  dispatch({ isLoading: true });

  const result = await chatsAPI.getChatUsers({ id: action.chatId });

  if (apiError(result)) {
    dispatch({
      isLoading: false,
      deleteUserError: result.reason,
    });
    return;
  }

  dispatch({
    isLoading: false,
    chatUsers: result.map((user) => transformUser(user)),
  });
};
