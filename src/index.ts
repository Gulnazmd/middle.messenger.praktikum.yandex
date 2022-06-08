import LoginPage from 'pages/login';
import RegPage from 'pages/registration';
import { RenderDOM, RegisterComponent } from 'core';
import './style.css';
import {
  Button,
  Link,
  Input,
} from 'components';

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
      RenderDOM(new LoginPage({}));
      break;
    case '/registration':
      RenderDOM(new RegPage({}));
      break;
    default:
      console.log('nothing');
  }
});
