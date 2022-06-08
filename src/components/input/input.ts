import Block from '../../core/block';
import './input.css';

export class Input extends Block {
  protected render(): string {
    return `
        <div class="inputDiv">
            <label class="label" for={{id}}>{{label}}</label>
            <input class="input input__error-{{thisError}}" onChange() id={{id}} type={{type}} placeholder={{placeholder}} value={{value}} >
            <span class="input__error">{{error}}</span>
        </div>`;
  }
}
