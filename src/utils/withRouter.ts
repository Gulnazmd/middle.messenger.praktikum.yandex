import { BlockConstructable, Router } from 'core';

type WithRouterProps = { router: Router };

export function withRouter<T extends WithRouterProps>(Component: BlockConstructable<T>) {
  return class WithRouter extends Component {
    constructor(props: T) {
      super({ ...props, router: window.router });
    }
  };
}
