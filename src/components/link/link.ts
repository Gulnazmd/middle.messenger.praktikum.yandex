import Block from 'core/block';

import './link.css';

interface LinkProps {
  text: string;
  to: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
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
