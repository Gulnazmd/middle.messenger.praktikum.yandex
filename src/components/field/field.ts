import Block from 'core/block';
import './field.css';

export class Field extends Block {
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
