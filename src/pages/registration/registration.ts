import Handlebars from 'handlebars';
import registrationTmpl from './registration.tmpl';
import Block from '../../core/block';

const IDS = {
  login: 'login-input',
  password: 'password-input',
  password2: 'password-input-2',
  email: 'email-input',
  phone: 'phone-input',
  first_name: 'first-name-input',
  second_name: 'second-name-input',
  button: 'button-id',
}

const contentHTML = Handlebars.compile(registrationTmpl)(
  {...IDS });
const contentElement: any = document.getElementById('content');
contentElement.innerHTML = contentHTML;
console.log(contentElement)