import Block from 'core/Block';
import Route from './Route';

interface BlockConstructable<Props extends {}> {
  new(props: any): Block<Props>;
}

class Router {
  private static __instance: Router;

  private _rootQuery: string;

  private _pathnames: string[];

  private _currentRoute: Nullable<Route>;

  routes: Route[];

  history: History;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }
    Router.__instance = this;
    this.routes = [];
    this._pathnames = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
  }

  get currentRoute() {
    return this._currentRoute;
  }

  use(pathname: string, block: BlockConstructable<{}>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);
    this._pathnames.push(pathname);

    return this;
  }

  back() {
    this.history.back();
    const pathname = this._hasRoute(window.location.pathname);
    this._onRoute(pathname);
  }

  forward() {
    this.history.forward();
    const pathname = this._hasRoute(window.location.pathname);
    this._onRoute(pathname);
  }

  private _hasRoute(pathname: string) {
    if (!this._pathnames.includes(pathname)) {
      return '*';
    }
    return pathname;
  }

  start() {
    window.onpopstate = () => {
      const pathname = this._hasRoute(window.location.pathname);
      this._onRoute(pathname);
    };

    const pathname = this._hasRoute(window.location.pathname);
    this._onRoute(pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
