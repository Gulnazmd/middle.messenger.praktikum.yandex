import './input.css';

const template = `
    <label for={{id}} class="input__label">{{label}}</label>
    <input class="input input__error-{{thisError}}" id={{id}} type={{type}} name={{name}} value={{value}}  placeholder={{placeholder}}>
    <span class="input__error">{{error}}</span>
`;

export default template;