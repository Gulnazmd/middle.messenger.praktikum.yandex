import Handlebars from 'handlebars';
import tmpl from './input.tmpl.js';

export default function({label, name, value, maxlength, type}) {
    return Handlebars.compile(tmpl, {noEscape: true})({label, name, value, maxlength, type});
}