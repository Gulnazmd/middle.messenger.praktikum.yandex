import { Button } from 'components/button';
import {
  Link,
  Input,
  Field,
} from 'components';
import { registerComponent, Store, Router  } from 'core';
import './style.css';
import { Screens } from 'core/screens';
import { initApp } from './services/initApp';
import { defaultState } from './store';
import { LoginPage } from 'pages/login';
import { RegPage } from 'pages/registration';
import { userProfile } from 'pages/userProfile';
import { ChatsPage } from './modules/chats';
import Error  from 'pages/errors/error'
import Avatar from 'components/avatar/avatar';


function registerComponents() {
  registerComponent(Button, 'Button');
  registerComponent(Link, 'Link');
  registerComponent(Input, 'Input');
  registerComponent(Field, 'Field');
  registerComponent(Avatar, 'Avatar');
}

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();

  const store = new Store<AppState>(defaultState);
  const router = new Router('#content');
  window.router = router;
  window.store = store;

  store.dispatch(initApp);

  router
    .use(Screens.Login, LoginPage)
    .use(Screens.RegPage, RegPage)
    .use(Screens.ProfilePage, userProfile)
    .use(Screens.ChatsPage, ChatsPage)
    .use(Screens.Error, Error)

    store.on('changed', (prevState, nextState) => {
      if (!prevState.appIsInited && nextState.appIsInited) {
        router.start();
      }
    });
});
