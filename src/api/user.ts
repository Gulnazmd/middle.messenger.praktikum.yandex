import HTTP from '../core/fetch';
import {
  ChangeUserProfileRequest,
  ChangeUserProfileResponse,
  ChangeAvatarRequest,
  ChangeUserPasswordRequest,
  ChangeUserPasswordResponse,
  FindUserRequest,
  UserDTO,
} from './types/userTypes';

const userAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/user');

class UserAPI {
  changeUserProfile(data: ChangeUserProfileRequest) {
    return userAPIInstance.put('/profile', { data })
      .then(({ response }) => response as ChangeUserProfileResponse);
  }

  changeAvatar(data: ChangeAvatarRequest) {
    return userAPIInstance.put('/profile/avatar', {
      data,
      isFile: true,
    }).then(({ response }) => (response as UserDTO));
  }

  changeUserPassword(data: ChangeUserPasswordRequest) {
    return userAPIInstance.put('/password', { data })
      .then(({ response }) => response as ChangeUserPasswordResponse);
  }

  findUserByLogin(data: FindUserRequest) {
    return userAPIInstance.post('/search', {
      data,
    }).then(({ response }) => (response as UserDTO[]));
  }
}

export default new UserAPI();
