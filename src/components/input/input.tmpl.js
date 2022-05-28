import './input.css';

module.exports = `
    <label for={{name}} class="input__label">{{label}}</label>
    <input class="input" id={{name}} type={{type}} name={{name}} value={{ value }} maxlength={{maxlength}}>
`;