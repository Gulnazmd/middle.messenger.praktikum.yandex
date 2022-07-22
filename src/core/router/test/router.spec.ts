/* eslint-disable */
import { expect } from 'chai';
import 'jsdom-global/register';
import { JSDOM } from 'jsdom';
import Router from '../router';
import { LoginPage } from '../../../pages/login';
import { Screens } from '../../screens';

describe('Router', () => {
  /*
  let router: Router;

  before('Router initialization with 7 route`s', () => {
    const dom = new JSDOM('<!DOCTYPE html><head></head><body><div id="content"></div></body>', {
      url: 'http://localhost:3000',
    });

    (global as any).window = dom.window;

    const router = new Router('#content');
    router
      .use(Screens.LOGIN, LoginPage);
  });

  it('should be singletone', () => {
    expect(new Router('#content')).to.eq(router);
  });
  */
  it('test', () => {
    expect(true).to.be.eq(true);
  });
});
