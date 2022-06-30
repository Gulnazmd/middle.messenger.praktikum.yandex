import { APIError } from './errorsTypes';
import { UserDTO } from './userTypes';

export type CreateChatRequest = {
  title: string
}

export type CreateChatResponseData = {
  id: string,
}

export type DeleteChatRequest = {
  chatId: number,
}

export type DeleteChatResponseData = {} | APIError;

export type GetChatUsersRequest = {
  id: number,
  offset?: number,
  limit?: number,
  name?: string,
  email?: string,
}

export type GetChatUsersResponse = UserDTO[] | APIError;

export type GetNewMessagesRequest = {
  id: number,
}

export type UploadAvatarRequest = {
  chatId: number,
  avatar: FormData,
}

export type AddUsersToChatRequest = {
  users: number[],
  chatId: number,
}

export type DeleteUsersFromChatRequest = {
  users: number[],
  chatId: number,
}

export type ChatDTO = {
  id: number,
  title: string,
  avatar: string,
  unread_count: string,
}

export type GetTokenResponseData = {
  token: string,
}

export type AddUsersToChatResponseData = {} | APIError;
export type DeleteUserFromChatResponseData = {} | APIError;
