import { AppState } from './appState';
import { Store } from '../core/store';
import Router from '../core/router';

export interface NewWindow extends Window {
  store: Store<AppState>;
  router: Router;
}
