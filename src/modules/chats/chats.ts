import Handlebars from 'handlebars';
import chatsTmpl from './chats.tmpl';


const contentHTML = Handlebars.compile( chatsTmpl )({'placeholder': 'Search'});
const contentElement: any  = document.getElementById('chats');
contentElement.innerHTML = contentHTML;
