export type ChangeUserProfilePayload = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

export type ChangeUserPasswordPayload = {
  oldPassword: string,
  newPassword: string
}

export type UploadAvatarPayload = {
  avatar: FormData,
}
