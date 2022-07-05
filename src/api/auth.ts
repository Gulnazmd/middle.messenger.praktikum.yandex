import HTTP from 'core/fetch';
import {
  GetUserResponseData,
  SigninRequestData,
  SigninResponseData,
  SignupRequestData,
  SignupResponseData,
} from './types/regTypes';

const authAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/auth');

class AuthAPI {
  signup(data: SignupRequestData) {
    return authAPIInstance.post('/signup', { data })
      .then(({ response }) => response as SignupResponseData);
  }

  signin(data: SigninRequestData) {
    return authAPIInstance.post('/signin', { data })
      .then(({ response }) => response as SigninResponseData);
  }

  getUser() {
    return authAPIInstance.get('/user')
      .then(({ response }) => response as GetUserResponseData);
  }

  logout() {
    return authAPIInstance.post('/logout', {})
      .then(({ response }) => response);
  }
}

export default new AuthAPI();
