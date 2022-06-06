import Handlebars from 'handlebars';
import loginTmpl from './login.tmpl';

const contentHTML = Handlebars.compile(loginTmpl)({ 'login': 'gulnazmd', 'password': 'qwerty' });


const contentElement: any  = document.getElementById('content');
contentElement.innerHTML = contentHTML;