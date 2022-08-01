import { BlockConstructable, Dispatch } from 'core';
import { AppState } from 'types/appState';

interface PropsWithDispatch {
  dispatch: Dispatch<AppState>
}

export function withStore<P extends PropsWithDispatch>(
  WrappedBlock: BlockConstructable<P>,
  mapStateToProps: (state: AppState) => Partial<P>,
) {
  return class extends WrappedBlock {
    constructor(props: P) {
      super({
        ...props,
        ...mapStateToProps((<any>window).store.getState()),
        dispatch: (<any>window).store.dispatch.bind((<any>window).store),
      });
    }

    __onChangeStoreCallback = () => {
      this.setProps({
        ...this.props,
        ...mapStateToProps((<any>window).store.getState()),
        dispatch: (<any>window).store.dispatch.bind((<any>window).store),
      });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      (<any>window).store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      (<any>window).store.off('changed', this.__onChangeStoreCallback);
    }
  };
}
