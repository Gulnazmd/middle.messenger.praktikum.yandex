import Block from 'core/block';
import './input.css';
import IInputProps from './types/inputProps'

export class Input extends Block {
  constructor(props: IInputProps) {
    super({ ...props, events: { focus: props.onFocus, blur: props.onBlur } });
  }

  protected render(): string {
    return `
            <input class="field__input {{#if error}}field__input__error{{/if}}" id={{id}} type={{type}} placeholder={{placeholder}}
            value={{value}} >
            `;
  }
}
