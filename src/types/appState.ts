import { Message } from './message';
import { User } from './user';
import { Chat } from './chat';

export type AppState = {
  isLoading: boolean;
  loginFormError: string;
  signupFormError: string,
  addUserError: string,
  deleteUserError: string,
  user: User | null,
  appIsInited: boolean,
  chats: Chat[],
  searchResult: User[],
  chatUsers: User[],
  socket: WebSocket | null,
  messages: Message[],
};
