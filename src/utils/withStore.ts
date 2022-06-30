import { BlockConstructable, Dispatch } from 'core';

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
        ...mapStateToProps(window.store.getState()),
        dispatch: window.store.dispatch.bind(window.store),
      });
    }

    __onChangeStoreCallback = () => {
      this.setProps({
        ...this.props,
        ...mapStateToProps(window.store.getState()),
        dispatch: window.store.dispatch.bind(window.store),
      });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeStoreCallback);
    }
  };
}
