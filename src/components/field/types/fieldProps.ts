import InputTypes from './fieldTypes';

interface IfieldProps {
  id?: string,
  className?: string,
  type?: InputTypes,
  value?: string,
  name?: string,
  placeholder?: string,
  readonly?: boolean,
  onBlur?: (e: Event) => void,
  onFocus?: (e: Event) => void,
  onChange?: (e: Event) => void,
  accept?: string,
}

export default IfieldProps;
