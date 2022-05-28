import Handlebars from 'handlebars';
import authTmpl from './login.tmpl.js';

const contentHTML = Handlebars.compile(authTmpl)({'login': 'gulnazmd', 'password': 'qwerty'});
const contentElement = document.getElementById('content');
contentElement.innerHTML = contentHTML;