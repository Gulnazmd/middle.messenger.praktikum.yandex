import Handlebars from 'handlebars';
import tmpl from './input.tmpl';
import Block from '../../core/block';


type InputProps = {
    type: 'text' | 'password' | 'email' | 'number';
    placeholder: string;
    value: string;
    error: string;
    label: string;
    name: string;
}

export default class Input extends Block {
    constructor({ type = 'text', error, label, name, placeholder, value }: InputProps) {
        super({ type, placeholder, label, value, name, error });
    }

    protected render(): string {
        const { error } = this.props;
        const context = this.props.context as InputProps;
        return Handlebars.compile(tmpl, {noEscape: true})({...context, value: this.props.value, error, thisError: Boolean(error)});
     }

}
