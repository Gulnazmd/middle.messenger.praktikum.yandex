export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  email: string;
  display_name: string;
  avatar: string;
};

export type ChangeAvatarRequest = {
  avatar: FormData,
}