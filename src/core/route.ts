import renderDOM from './renderDOM';
import Block from './block';

interface BlockConstructable<Props> {
  new(props: any): Block<Props>;
}

interface IProps {
  rootQuery: string,
}

export default class Route {
  private _pathname;

  private _blockClass: BlockConstructable<{}>;

  private _block: Block<{}> | null;

  private _props: IProps;

  constructor(pathname: string, view: BlockConstructable<{}>, props: IProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  get pathname() {
    return this._pathname;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
    } else {
      this._block.show();
    }

    renderDOM(this._block, this._props.rootQuery);
  }
}
