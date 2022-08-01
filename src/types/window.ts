import { Store } from 'core/store';
import Router from 'core/router';
import { AppState } from './appState';

export interface NewWindow extends Window {
  store: Store<AppState>;
  router: Router;
}
