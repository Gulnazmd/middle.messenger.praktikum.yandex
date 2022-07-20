//@ts-nocheck
import type { Dispatch } from '../core';
import chatsAPI from '../api/chats';
import { apiError } from '../utils/apiError';
import { transformMessages, transformMessage } from '../utils/apiTransformers';
import {
  CreateConnectionPayload,
  SendMessagePayload,
} from './types/sockets';
import { logout } from './auth';

const BASE_URL = 'wss://ya-praktikum.tech/ws';

export const createConnection = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: CreateConnectionPayload,
) => {
  const tokenResponse = await chatsAPI.getToken(action.chatId);

  if (apiError(tokenResponse)) {
    dispatch(logout);
    return;
  }

  const userID = state.user?.id;
  const socket = new WebSocket(`${BASE_URL}/chats/${userID}/${action.chatId}/${tokenResponse.token}`);

  socket.addEventListener('open', () => {
    dispatch({ socket });

    socket.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    const newMessages = [...window.store.getState().messages];

    if (Array.isArray(data)) {
      newMessages.push(...transformMessages(data));
    } else {
      newMessages.push(transformMessage(data));
    }
    dispatch({
      messages: newMessages,
    });
  });
  socket.addEventListener('error', (event: Event) => {
    console.log('Ошибка', event.message);
  });
};

export const sendMessage = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: SendMessagePayload,
) => {
  if (!state.socket) {
    return;
  }

  state.socket.send(JSON.stringify({
    content: action.message,
    type: 'message',
  }));
};
