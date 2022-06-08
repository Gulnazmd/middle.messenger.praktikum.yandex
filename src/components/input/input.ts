import Block from '../../core/block';
import './input.css';

type InputProps = {
    onChange?: () => void;
    type: 'text' | 'password' | 'email' | 'number';
    placeholder: string;
    value: string;
    error: string;
    label: string;
    name: string;
    email: string;
}

export class Input extends Block {
  constructor({
    onChange = () => { }, type = 'text', error, label, email, name, placeholder, value,
  }: InputProps) {
    super({
      type, placeholder, label, email, value, name, error, events: { input: onChange },
    });
  }

  protected render(): string {
    return `
        <div class="inputDiv">
            <label class="label" for={{id}}>{{label}}</label>
            <input class="input input__error-{{thisError}}" onChange() id={{id}} type={{type}} name={{name}} value={{value}}  placeholder={{placeholder}}>
            <span class="input__error">{{error}}</span>
        </div>`;
  }
}
