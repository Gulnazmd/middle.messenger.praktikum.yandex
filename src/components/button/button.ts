import Handlebars from 'handlebars';
import buttonTmpl from './button.tmpl';

export default function(text: any) {
    return Handlebars.compile(buttonTmpl, {noEscape: true})({text});
}