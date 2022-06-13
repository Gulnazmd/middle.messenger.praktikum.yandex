import InputType from './inputTypes';

export enum InputVariants {
  CLASSIC,
  FILLED,
}
interface IInputProps {
  id?: string,
  className?: string,
  type?: InputType,
  value?: string,
  name?: string,
  placeholder?: string,
  onBlur?: (e: Event) => void,
  onFocus?: (e: Event) => void,
  onChange?: (e: Event) => void,
}

export default IInputProps;