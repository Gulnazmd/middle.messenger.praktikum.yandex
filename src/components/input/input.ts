import Block from '../../core/block';
import './input.css';

interface InputProps {
  id: string;
  type: string;
  error: string;
  label: string;
  placeholder: string;
  onFocus: () => void;
  onBlur: () => void;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({ ...props, events: { focus: props.onFocus, blur: props.onBlur } });
  }

  protected render(): string {
    return `
            <input class="field__input {{#if error}}field__input__error{{/if}}" id={{id}} type={{type}} placeholder={{placeholder}}
            value={{value}} >
            `;
  }
}
