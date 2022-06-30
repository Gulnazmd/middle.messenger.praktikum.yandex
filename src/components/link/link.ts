import Block from 'core/block';
import { ILinkProps } from './types';
import './link.css';

export interface ILinkPropsWithEvents extends Omit<ILinkProps, 'onClick'> {
  events: {
    click: (e: Event) => {},
  }
}

class Link extends Block<ILinkPropsWithEvents> {
  constructor(props: ILinkProps) {
    const { onClick, ...rest } = props;
    const defaultProps = {
      danger: false,
    };

    super({
      ...defaultProps,
      ...rest,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `
      <a class="link" href="{{to}}">{{text}}</a>
    `;
  }
}
export default Link;