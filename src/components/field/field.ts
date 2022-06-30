import Block from 'core/block';
import './field.css';
import { IfieldProps } from './types';

class Field extends Block<IfieldProps> {
  constructor(props: IfieldProps) {
    const defaultProps = {
      readonly: false,
    };
    super({
      ...defaultProps,
      ...props,
    });
  }

  protected render(): string {
    return `
        <div class="field">
            <label class="field__label" for={{id}}>{{label}}</label>
            {{{Input id=id error=error type=type placeholder=placeholder onFocus=onFocus onBlur=onBlur
            value=value}}}
            <span class="field__span__error">{{error}}</span>
        </div>`;
  }
}

export default Field;
