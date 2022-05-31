import Handlebars from 'handlebars';
import registrationTmpl from './registration.tmpl';

const contentHTML = Handlebars.compile(registrationTmpl)({
  first_name: 'Gulnaz',
  second_name: 'Valiullina',
  login: 'gulnazmd',
  password: 'qwerty',
  password2: 'qwerty',
  email: 'gulnazmd@yandex.ru',
  phone: 79531122211,

});
const contentElement= document.getElementById('content-reg');
contentElement.innerHTML = contentHTML;