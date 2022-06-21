import Block from 'core/block';
import { IButtonProps } from './types';
import './button.css';

export class Button extends Block {
  constructor({ text, onClick }: IButtonProps) {
    super({ text, events: { click: onClick } });
  }

  protected render(): string {
    return `
        <button class="button" type="button">{{text}}</button>
    `;
  }
}
