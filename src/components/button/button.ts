import Block from '../../core/block';
import { IButtonProps } from './types';
import './button.css';

interface IButtonPropsWithEvents extends Omit<IButtonProps, 'onClick'> {
  events: {
    click: (e: Event) => void,
  }
}

class Button extends Block<IButtonPropsWithEvents> {
  constructor(props: IButtonProps) {
    const {
      onClick, className, id, label, type, dataId, text,
    } = props;

    const classNames: string[] = [];
    if (className) {
      classNames.push(className);
    }

    super({
      id,
      label,
      dataId,
      type,
      text,
      events: {
        click: onClick,
      },
    });
  }

  protected render(): string {
    return `
        <button class="button" type="button" id={{id}}>{{text}}</button>
    `;
  }
}

export default Button;
