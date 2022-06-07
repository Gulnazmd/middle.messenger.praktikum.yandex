import LoginPage from './pages/login';
import {RenderDOM, RegisterComponent} from './core';
import './style.css';
import {
  Button,
  Link,
  Input
} from './components';

function registerComponents() {
  RegisterComponent(Button);
  RegisterComponent(Link);
  RegisterComponent(Input);
}

document.addEventListener("DOMContentLoaded", () => {
  registerComponents();
  RenderDOM(new LoginPage({}));
})