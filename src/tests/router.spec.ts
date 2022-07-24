/* eslint-disable */
import { assert } from 'chai';
import 'jsdom-global/register';
import Router from '../core/router';
/*
import { Store } from '../core/store'
import { defaultState } from '../store/index'
import { AppState } from '../types/appState'
import { initApp } from '../services/initApp';
import { Screens } from '../core/screens';
import { LoginPage } from '../pages/login';
*/
describe('Router', () => {
  it('router is created', () => {
    const router = new Router('#content');
    /*
    const store = new Store<AppState>(defaultState);
    (<any>window).router = router;
    (<any>window).store = store;
    store.dispatch(initApp);
    router.use(Screens.LOGIN, LoginPage);
    router.start();
    */
    assert.exists(router);
  });
});
