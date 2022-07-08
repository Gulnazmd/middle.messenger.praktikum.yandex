import Block from 'core/block';
import { ILinkProps } from './types';
import './link.css';

export interface ILinkPropsWithEvents extends Omit<ILinkProps, 'onClick'> {
  events: {
    click: (e: Event) => void,
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

  protected render(): string {
    return `
      <a class="link" href="{{to}}">{{text}}</a>
    `;
  }
}
export default Link;
