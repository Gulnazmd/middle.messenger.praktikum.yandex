import { BlockConstructable } from '../core';
import { User } from '../types/user';
import { AppState } from '../types/appState';

type WithUserProps = { user: User | null };

export function withUser<P extends WithUserProps>(WrappedBlock: BlockConstructable<P>) {
  return class extends WrappedBlock {
    constructor(props: P) {
      super({ ...props, user: (<any>window).store.getState().user });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      if (JSON.stringify(prevState.user) !== JSON.stringify(nextState.user)) {
        this.setProps({ ...this.props, user: nextState.user });
      }
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      (<any>window).store.on('changed', this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      (<any>window).store.off('changed', this.__onChangeUserCallback);
    }
  };
}
