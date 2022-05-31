import Handlebars from 'handlebars';
import buttonTmpl from './button.tmpl.js';

export default function(text) {
    return Handlebars.compile(buttonTmpl, {noEscape: true})({text});
}