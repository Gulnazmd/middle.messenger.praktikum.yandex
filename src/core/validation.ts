export default function Validate(value: string, name: string): string {
  const errors = [];
  switch (name) {
    case 'first_name':
    case 'second_name':
      if (!(/^[A-Z, А-Я]/).test(value)) {
        errors.push('capitalize your name');
      }
      if ((/[^\-,A-Z,a-z,А-Я,а-я]/).test(value) || (/[\d]/).test(value)) {
        errors.push('don\'t use special characters, numbers and spaces');
      }
      break;
    case 'login':
      if (!(value.length >= 3 && value.length <= 20)) {
        errors.push('use 3 to 20 characters');
      }
      if (!(/[\D]/).test(value)) {
        errors.push('don\'t use just numbers');
      }
      if ((/[^\-\w]/).test(value)) {
        errors.push('don\'t use Cyrillic, special characters or spaces');
      }
      break;
    case 'password':
    case 'password2':
      if (!(value.length >= 8 && value.length <= 40)) {
        errors.push('use 8 to 40 characters');
      }
      if (!(/[A-Z,А-Я]/).test(value)) {
        errors.push('use one capital letter');
      }
      break;
    case 'phone':
      if (!(value.length >= 10 && value.length <= 15)) {
        errors.push('use 10 to 15 symbols');
      }
      if (!(/^[+]?\d+$/).test(value)) {
        errors.push('don\'t use invalid characters');
      }
      break;
    case 'email':
      if (!(/^[\w+-]+(\.[\w+-]+)*@[\w-]+(\.[\w-]+)+$/).test(value)) {
        errors.push('wrong email format');
      }
      break;
    case 'message':
      if (!value) {
        errors.push('field can\'t be empty');
      }
      break;
    default:
      return '';
  }
  return errors.join(', ');
}
