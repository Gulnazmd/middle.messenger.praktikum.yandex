import { BlockConstructable, router } from '../core';

type WithRouterProps = { router: router };

export function withRouter<T extends WithRouterProps>(Component: BlockConstructable<T>) {
  return class WithRouter extends Component {
    constructor(props: T) {
      super({ ...props, router: window.router });
    }
  };
}