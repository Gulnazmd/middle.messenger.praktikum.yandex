import Block from 'core/block';
import { ILinkProps } from './types';
import './link.css';


export class Link extends Block {
  constructor(props: ILinkProps) {
    const onClick = (_e: MouseEvent) => {
      console.log('link click', _e);
    };
    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `
      <a class='link' href='{{to}}'>{{text}}</a>
    `;
  }
}
