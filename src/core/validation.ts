export default function Validate(value: string, name: string): string {
  const errors = [];
  switch (name) {
    case 'first_name':
    case 'second_name':
      if (!(/^[A-Z, А-Я]/).test(value)) {
        errors.push('напиши имя с заглавной буквы');
      }
      if ((/[^\-,A-Z,a-z,А-Я,а-я]/).test(value) || (/[\d]/).test(value)) {
        errors.push('не стоит использовать спецсимволы, цифры и пробелы');
      }
      break;
    case 'login':
      if (!(value.length >= 3 && value.length <= 20)) {
        errors.push('можно от 3 до 20 символов');
      }
      if (!(/[\D]/).test(value)) {
        errors.push('используй не только цифры');
      }
      if ((/[^\-\w]/).test(value)) {
        errors.push('не стоит использовать кириллицу, спецсимволы или пробелы');
      }
      break;
    case 'password':
    case 'password2':
      if (!(value.length >= 8 && value.length <= 40)) {
        errors.push('можно от 8 до 40 символов');
      }
      if (!(/[A-Z,А-Я]/).test(value)) {
        errors.push('должна быть заглавная буква');
      }
      break;
    case 'phone':
      if (!(value.length >= 10 && value.length <= 15)) {
        errors.push('можно от 10 до 15 символов');
      }
      if (!(/^[+]?\d+$/).test(value)) {
        errors.push('ты используешь недопустимые символы');
      }
      break;
    case 'email':
      if (!(/^[\w+-]+(\.[\w+-]+)*@[\w-]+(\.[\w-]+)+$/).test(value)) {
        errors.push('неправильный формат email');
      }
      break;
    case 'message':
      if (!value) {
        errors.push('поле не может быть пустым');
      }
  }
  return errors.join(', ');
}
