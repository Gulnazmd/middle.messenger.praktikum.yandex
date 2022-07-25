import Block from 'core/block';
import { IInputProps } from './types';

interface IInputPropsWithEvents extends Omit<IInputProps, 'onBlur' | 'onFocus' | 'onChange'> {
  events: {
    blur?: EventListener,
    focus?: EventListener,
    input?: EventListener,
  }
}

class Input extends Block<IInputPropsWithEvents> {
  constructor(props: IInputProps) {
    const {
      onBlur,
      onFocus,
      onChange,
      ...rest
    } = props;

    super({
      ...rest,
      events: {
        blur: onBlur,
        focus: onFocus,
        input: onChange,
      },
    });
  }

  protected render(): string {
    return `
      <input class="field__input {{#if error}}field__input__error{{/if}}" id={{id}} type={{type}} placeholder={{placeholder}} value={{value}}>
    `;
  }
}

export default Input;
