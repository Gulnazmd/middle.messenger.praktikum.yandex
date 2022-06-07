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
}

export class Input extends Block  {
    constructor({ onChange = () => { }, type = 'text', error, label, name, placeholder, value }: InputProps) {
        super({ type, placeholder, label, value, name, error, events: {input: onChange}});
    }

    protected render(): string {
        return `
        <div>
            <label for={{id}} class="input__label">{{label}}</label>
            <input class="input input__error-{{thisError}}" id={{id}} type={{type}} name={{name}} value={{value}}  placeholder={{placeholder}}>
            <span class="input__error">{{error}}</span>
        </div>`
      }
}
