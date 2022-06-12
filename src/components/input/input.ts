import Block from '../../core/block';
import './input.css';

export class Input extends Block {
  protected render(): string {
    return `
        <div class="field">
            <label class="field__label" for={{id}}>{{label}}</label>
            <input class="field__input {{#if error}}field__input__error{{/if}}" id={{id}} type={{type}} placeholder={{placeholder}} value={{value}} >
            <span class="field__span__error">{{error}}</span>
        </div>`;
  }
}
