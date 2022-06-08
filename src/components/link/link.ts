import Block from 'core/Block';

import './link.css';

interface LinkProps {
  text: string;
  to: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    const onClick = (_e: MouseEvent) => {
      console.log('link click');
    };

    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `<a class="link" href="{{to}}">{{text}}</a>`;
  }
}
