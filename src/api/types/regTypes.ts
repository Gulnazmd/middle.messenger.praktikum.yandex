import { UserDTO, APIError } from './types';

export type SigninRequestData = {
  login: string,
  password: string
}

export type SigninResponseData = APIError;

export type SignupRequestData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export type SignupResponseData = {
  id: number
} | APIError;

export type GetUserResponseData = UserDTO | APIError;
