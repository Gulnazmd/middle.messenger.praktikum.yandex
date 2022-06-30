import { APIError } from './errorsTypes';

export type ChangeUserProfileRequest = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

export type ChangeUserProfileResponse = UserDTO | APIError;

export type ChangeAvatarRequest = {
  avatar: FormData,
}

export type ChangeUserPasswordRequest = {
  oldPassword: string,
  newPassword: string
}

export type ChangeUserPasswordResponse = {} | APIError;

export type FindUserRequest = {
  login: string,
}

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};