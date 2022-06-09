import {
  Button,
  Link,
  Input,
} from 'components';
import LoginPage from 'pages/login';
import RegPage from 'pages/registration';
import { RenderDOM, RegisterComponent } from 'core';
import Chats from './modules/chats';
import './style.css';

function registerComponents() {
  RegisterComponent(Button);
  RegisterComponent(Link);
  RegisterComponent(Input);
}

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();

  switch (window.location.pathname) {
    case '':
    case '/':
      RenderDOM(new LoginPage());
      break;
    case '/registration':
      RenderDOM(new RegPage());
      break;
    case '/chats':
      RenderDOM(new Chats());
      break;
    default:
      console.log('nothing');
  }
});
