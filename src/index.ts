import {
  Button,
  Link,
  Input,
  Field,
} from 'components';
import { registerComponent, Router, Store } from 'core';
import './style.css';
import { Screens } from 'core/screens';
import { LoginPage } from 'pages/login';
import { RegPage } from 'pages/registration';
import { userProfile } from 'pages/userProfile';
import Error from 'pages/errors/error';
import Avatar from 'components/avatar/avatar';
import { Dropdown } from 'components/dropdown';
import { AppState } from 'types/appState';
import { initApp } from './services/initApp';
import { defaultState } from './store';
import { ChatsPage } from './modules/chats';

function registerComponents() {
  registerComponent(Button, 'Button');
  registerComponent(Link, 'Link');
  registerComponent(Input, 'Input');
  registerComponent(Field, 'Field');
  registerComponent(Avatar, 'Avatar');
  registerComponent(Dropdown, 'Dropdown');
}

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();

  const store = new Store<AppState>(defaultState);
  const router = new Router('#content');
  (<any>window).router = router;
  (<any>window).store = store;

  store.dispatch(initApp);

  router
    .use(Screens.LOGIN, LoginPage)
    .use(Screens.REGPAGE, RegPage)
    .use(Screens.PROFILEPAGE, userProfile)
    .use(Screens.CHATSPAGE, ChatsPage)
    .use(Screens.ERROR, Error);

  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }
  });
});
